package com.heritage.platform;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heritage.platform.entity.Category;
import com.heritage.platform.entity.Post;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.PostStatus;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.CategoryRepository;
import com.heritage.platform.repository.CommentRepository;
import com.heritage.platform.repository.ContributorApplicationRepository;
import com.heritage.platform.repository.PostRepository;
import com.heritage.platform.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class PublicPostSearchApiTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ContributorApplicationRepository contributorApplicationRepository;

    private User author;
    private User admin;
    private Category traditionalCraftsmanship;
    private Category performingArts;

    @BeforeEach
    void setUp() {
        commentRepository.deleteAll();
        contributorApplicationRepository.deleteAll();
        postRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();

        author = userRepository.save(new User("public-author", "hash", "Public Author", null, UserRole.USER, true));
        admin = userRepository.save(new User("public-admin", "hash", "Public Admin", null, UserRole.ADMIN, true));
        traditionalCraftsmanship = categoryRepository.save(Category.create("Traditional Craftsmanship", "Traditional craft category"));
        performingArts = categoryRepository.save(Category.create("Performing Arts", "Performing arts category"));
    }

    @Test
    void shouldReturnOnlyPublishedPosts() throws Exception {
        createPost("Published Visible Post", "Published content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Draft Hidden Post", "Draft content", author, traditionalCraftsmanship, PostStatus.DRAFT);
        createPost("Pending Hidden Post", "Pending content", author, traditionalCraftsmanship, PostStatus.PENDING_REVIEW);
        createPost("Rejected Hidden Post", "Rejected content", author, traditionalCraftsmanship, PostStatus.REJECTED);
        createPost("Archived Hidden Post", "Archived content", author, traditionalCraftsmanship, PostStatus.ARCHIVED);

        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].title").value("Published Visible Post"))
                .andExpect(jsonPath("$.data[0].status").value("PUBLISHED"));
    }

    @Test
    void shouldSearchPublishedPostsByKeywordCaseInsensitively() throws Exception {
        Category jadeCategory = categoryRepository.save(Category.create("JADE Category", "Uppercase keyword category"));
        User jadeUsernameAuthor = userRepository.save(new User("JaDe-author", "hash", "Author Keyword", null, UserRole.USER, true));

        createPost("Jade Title Match", "Title-only content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Category Match Only", "Category-only content", author, jadeCategory, PostStatus.PUBLISHED);
        createPost("Author Match Only", "Author-only content", jadeUsernameAuthor, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Content Match Only", "This body mentions JADE in uppercase.", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Hidden Jade Draft", "Draft keyword content", author, traditionalCraftsmanship, PostStatus.DRAFT);

        MvcResult result = mockMvc.perform(get("/api/posts").param("keyword", "jade"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(4))
                .andReturn();

        assertThat(titlesFrom(result)).containsExactlyInAnyOrder(
                "Jade Title Match",
                "Category Match Only",
                "Author Match Only",
                "Content Match Only"
        );
    }

    @Test
    void shouldFilterPublishedPostsByCategory() throws Exception {
        createPost("Traditional Filter Match", "Traditional content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Performing Filter Nonmatch", "Performing content", author, performingArts, PostStatus.PUBLISHED);

        MvcResult result = mockMvc.perform(get("/api/posts").param("category", "Traditional Craftsmanship"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].categoryName").value("Traditional Craftsmanship"))
                .andReturn();

        assertThat(titlesFrom(result)).containsExactly("Traditional Filter Match");
    }

    @Test
    void shouldUseAndLogicWhenKeywordAndCategoryAreProvided() throws Exception {
        createPost("Jade AND Category Match", "Both filter content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Jade Keyword Wrong Category", "Keyword-only content", author, performingArts, PostStatus.PUBLISHED);
        createPost("Traditional Category Only", "Category-only content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);

        MvcResult result = mockMvc.perform(get("/api/posts")
                        .param("keyword", "jade")
                        .param("category", "Traditional Craftsmanship"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1))
                .andReturn();

        assertThat(titlesFrom(result)).containsExactly("Jade AND Category Match");
    }

    @Test
    void shouldRankKeywordResultsByRelevance() throws Exception {
        Category jadeCategory = categoryRepository.save(Category.create("Jade Ranking Category", "Ranking category"));
        User jadeUsernameAuthor = userRepository.save(new User("jade-ranking-author", "hash", "Ranking Author", null, UserRole.USER, true));

        createPost("Jade Title Match", "Title ranking content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        pauseForCreatedAtOrdering();
        createPost("Category Match Only", "Category ranking content", author, jadeCategory, PostStatus.PUBLISHED);
        pauseForCreatedAtOrdering();
        createPost("Author Match Only", "Author ranking content", jadeUsernameAuthor, traditionalCraftsmanship, PostStatus.PUBLISHED);
        pauseForCreatedAtOrdering();
        createPost("Content Match Only", "Content-only ranking text with jade.", author, traditionalCraftsmanship, PostStatus.PUBLISHED);

        MvcResult result = mockMvc.perform(get("/api/posts").param("keyword", "jade"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(4))
                .andReturn();

        assertThat(titlesFrom(result)).containsExactly(
                "Jade Title Match",
                "Category Match Only",
                "Author Match Only",
                "Content Match Only"
        );
    }

    @Test
    void shouldTreatBlankKeywordAndCategoryAsNoFilter() throws Exception {
        createPost("Blank Filter Published One", "First published content", author, traditionalCraftsmanship, PostStatus.PUBLISHED);
        createPost("Blank Filter Published Two", "Second published content", author, performingArts, PostStatus.PUBLISHED);
        createPost("Blank Filter Draft Hidden", "Draft content", author, traditionalCraftsmanship, PostStatus.DRAFT);

        MvcResult unfiltered = mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(2))
                .andReturn();

        MvcResult blankFiltered = mockMvc.perform(get("/api/posts")
                        .param("keyword", "   ")
                        .param("category", ""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(2))
                .andReturn();

        assertThat(idsFrom(blankFiltered)).containsExactlyElementsOf(idsFrom(unfiltered));
    }

    private Post createPost(String title, String content, User author, Category category, PostStatus status) {
        Post post = Post.create(
                title,
                content,
                "https://example.com/cover.jpg",
                "Heritage item",
                "Suzhou",
                author,
                category
        );

        switch (status) {
            case DRAFT -> {
            }
            case PENDING_REVIEW -> post.submitForReview();
            case PUBLISHED -> {
                post.submitForReview();
                post.approve(admin);
            }
            case ARCHIVED -> {
                post.submitForReview();
                post.approve(admin);
                post.archive(admin);
            }
            case REJECTED -> {
                post.submitForReview();
                post.reject(admin, "Needs revision");
            }
        }

        return postRepository.saveAndFlush(post);
    }

    private List<String> titlesFrom(MvcResult result) throws Exception {
        JsonNode data = objectMapper.readTree(result.getResponse().getContentAsString()).path("data");
        List<String> titles = new ArrayList<>();
        for (JsonNode item : data) {
            titles.add(item.path("title").asText());
        }
        return titles;
    }

    private List<Long> idsFrom(MvcResult result) throws Exception {
        JsonNode data = objectMapper.readTree(result.getResponse().getContentAsString()).path("data");
        List<Long> ids = new ArrayList<>();
        for (JsonNode item : data) {
            ids.add(item.path("id").asLong());
        }
        return ids;
    }

    private void pauseForCreatedAtOrdering() throws InterruptedException {
        Thread.sleep(5);
    }
}
