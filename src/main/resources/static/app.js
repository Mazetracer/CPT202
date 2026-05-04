const { createApp } = Vue;

const categoryMap = {
    "传统技艺": "Traditional Craftsmanship",
    "传统戏曲": "Traditional Opera",
    "古建筑": "Historic Architecture",
    "民俗节庆": "Folk Rituals & Festivals"
};

const nicknameMap = {
    "平台管理员": "Platform Curator",
    "小组成员1": "Team Member 1"
};

const textMap = {
    "苏绣的针法之美": "The Needlework Elegance of Suzhou Embroidery",
    "苏绣是中国传统刺绣的重要代表，讲究针法细腻、设色雅致。": "Suzhou embroidery is one of the most celebrated traditions of Chinese needlework, known for refined stitching and graceful colour composition.",
    "这篇文章适合后面再补几张针法细节图。": "This article would become even stronger with a few close-up images of the stitching techniques.",
    "手工艺、织染、雕刻等": "Craft traditions, dyeing, weaving, carving, and studio practice.",
    "戏曲、曲艺、说唱艺术": "Opera, ballad performance, oral storytelling, and stage heritage.",
    "古城、古桥、古园林与历史建筑": "Ancient towns, bridges, gardens, and protected architecture.",
    "节日仪式、民间风俗与庆典": "Festival ritual, seasonal custom, and collective celebration."
};

const heritageMap = {
    "苏绣": "Suzhou Embroidery",
    "昆曲": "Kunqu Opera",
    "蓝染技艺": "Indigo Dyeing",
    "皮影戏": "Shadow Puppetry",
    "元宵灯会": "Lantern Festival Procession",
    "廊桥营造技艺": "Covered Bridge Carpentry",
    "泥塑": "Clay Figurine Sculpture"
};

const regionMap = {
    "江苏苏州": "Suzhou, Jiangsu",
    "陕西西安": "Xi'an, Shaanxi",
    "福建泉州": "Quanzhou, Fujian",
    "贵州黔东南": "Qiandongnan, Guizhou",
    "浙江温州": "Wenzhou, Zhejiang",
    "天津": "Tianjin"
};

const postTitleByteLimit = 150;
const postContentByteLimit = 60000;

const backendMessageMap = {};

const categoryDescriptionMap = {
    "传统技艺": "Material culture, workshop practice, motifs, and making processes.",
    "传统戏曲": "Performance traditions, costume, vocal lineages, and stage memory.",
    "古建筑": "Historic buildings, construction craft, spatial heritage, and preservation.",
    "民俗节庆": "Seasonal ritual, festivals, community gatherings, and oral custom."
};

const defaultCoverFallbackImage = "/images/default-covers/default-heritage.svg";

const defaultCoverImageMap = {
    "traditional craftsmanship": "/images/default-covers/default-craftsmanship.svg",
    "traditional opera": "/images/default-covers/default-opera.svg",
    "historic architecture": "/images/default-covers/default-architecture.svg",
    "folk rituals & festivals": "/images/default-covers/default-folk-rituals.svg"
};

const categoryPieColors = ["#8f4b2f", "#6d7561", "#c9a36d", "#2f241d"];

const fallbackCategories = [
    { id: 1, name: "传统技艺", description: "Material culture, workshop practice, motifs, and making processes." },
    { id: 2, name: "传统戏曲", description: "Performance traditions, costume, vocal lineages, and stage memory." },
    { id: 3, name: "古建筑", description: "Historic buildings, construction craft, spatial heritage, and preservation." },
    { id: 4, name: "民俗节庆", description: "Seasonal ritual, festivals, community gatherings, and oral custom." }
];

const fallbackPostDetails = {
    101: {
        id: 101,
        title: "The Garden Stage Language of Kunqu",
        content: "This front-end demo article shows how a longer heritage essay can be displayed on the platform. It combines historical background, performance detail, and scene-setting notes that a student team can later connect to real backend data.",
        coverImageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
        heritageName: "昆曲",
        region: "江苏苏州",
        status: "PUBLISHED",
        authorName: "平台管理员",
        categoryName: "传统戏曲",
        likeCount: 34,
        favoriteCount: 19,
        commentCount: 6,
        imageUrls: [
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [
            { id: 1, authorNickname: "平台管理员", content: "A useful angle here would be to add costume symbolism and hand gesture notes.", createdAt: "2026-04-05T09:30:00" },
            { id: 2, authorNickname: "小组成员1", content: "The scene description already feels like a museum interpretation panel.", createdAt: "2026-04-05T14:10:00" }
        ],
        createdAt: "2026-04-05T08:00:00"
    },
    102: {
        id: 102,
        title: "Reading the Timber Logic of Historic Covered Bridges",
        content: "A category detail page should be able to surface architecture essays like this one, where structural systems, repair history, and local materials are described visually and accessibly.",
        coverImageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
        heritageName: "廊桥营造技艺",
        region: "浙江温州",
        status: "PUBLISHED",
        authorName: "平台管理员",
        categoryName: "古建筑",
        likeCount: 27,
        favoriteCount: 12,
        commentCount: 4,
        imageUrls: [
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1529421306624-54a49f2d50f8?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [
            { id: 3, authorNickname: "小组成员1", content: "The bridge section drawings would fit nicely into the gallery area.", createdAt: "2026-04-06T10:05:00" }
        ],
        createdAt: "2026-04-04T11:20:00"
    },
    103: {
        id: 103,
        title: "Field Notes from an Indigo Dye Workshop",
        content: "This sample entry demonstrates how process photography, tool documentation, and oral explanation can live together in one article page without needing video playback.",
        coverImageUrl: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=1200&q=80",
        heritageName: "蓝染技艺",
        region: "贵州黔东南",
        status: "PUBLISHED",
        authorName: "小组成员1",
        categoryName: "传统技艺",
        likeCount: 41,
        favoriteCount: 22,
        commentCount: 9,
        imageUrls: [
            "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [
            { id: 4, authorNickname: "平台管理员", content: "This one is strong enough to appear in the homepage ranking module.", createdAt: "2026-04-07T15:20:00" }
        ],
        createdAt: "2026-04-03T16:40:00"
    },
    104: {
        id: 104,
        title: "Lantern Processions and Night Ritual in the Old City",
        content: "Festival-oriented content can sit in the homepage alongside craft and architecture posts, giving the archive a more social and seasonal rhythm.",
        coverImageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
        heritageName: "元宵灯会",
        region: "福建泉州",
        status: "PUBLISHED",
        authorName: "小组成员1",
        categoryName: "民俗节庆",
        likeCount: 18,
        favoriteCount: 9,
        commentCount: 3,
        imageUrls: [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [],
        createdAt: "2026-04-02T18:15:00"
    },
    105: {
        id: 105,
        title: "Clay Figurine Colour Layers in Studio Practice",
        content: "This placeholder article supports the personal profile and category views by giving the platform a fuller archive for presentation and navigation testing.",
        coverImageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
        heritageName: "泥塑",
        region: "天津",
        status: "PUBLISHED",
        authorName: "平台管理员",
        categoryName: "传统技艺",
        likeCount: 16,
        favoriteCount: 8,
        commentCount: 2,
        imageUrls: [
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [],
        createdAt: "2026-04-01T13:00:00"
    },
    106: {
        id: 106,
        title: "Pattern Fragments from Shadow Puppet Costuming",
        content: "A richer front page works better when different article types can coexist: research notes, object studies, visual records, and curatorial reflections.",
        coverImageUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        heritageName: "皮影戏",
        region: "陕西西安",
        status: "PUBLISHED",
        authorName: "平台管理员",
        categoryName: "传统戏曲",
        likeCount: 22,
        favoriteCount: 11,
        commentCount: 5,
        imageUrls: [
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80"
        ],
        comments: [],
        createdAt: "2026-03-30T09:00:00"
    }
};

const workspaceDraftTemplates = [
    {
        id: "draft-1",
        title: "Draft: Mapping Ritual Sound in Temple Courtyards",
        categoryName: "民俗节庆",
        updatedAt: "2026-04-10T19:30:00",
        note: "Waiting for audio transcript cleanup and one cover image."
    },
    {
        id: "draft-2",
        title: "Draft: Motif Variations in Rural Woodcarving",
        categoryName: "传统技艺",
        updatedAt: "2026-04-09T16:10:00",
        note: "Needs a stronger opening paragraph and workshop credits."
    }
];

const workspacePendingTemplates = [
    {
        id: "pending-1",
        title: "Pending Review: Courtyard Festival Route Documentation",
        categoryName: "民俗节庆",
        updatedAt: "2026-04-08T12:40:00",
        note: "Submitted to the editorial queue. Waiting for category approval."
    },
    {
        id: "pending-2",
        title: "Pending Review: Roof Ornament Sketches from the South Gate",
        categoryName: "古建筑",
        updatedAt: "2026-04-07T10:25:00",
        note: "Awaiting image quality check and curator comments."
    }
];

const permissionRequestTemplates = [
    {
        id: "request-1",
        title: "Curator Review Access",
        status: "APPROVED",
        createdAt: "2026-04-03T09:00:00",
        note: "Approved for collection curation preview and metadata editing."
    },
    {
        id: "request-2",
        title: "Extended Publishing Rights",
        status: "PENDING",
        createdAt: "2026-04-10T14:45:00",
        note: "Pending faculty review."
    }
];

const adminApprovalTemplates = [
    {
        id: "approval-1",
        title: "Permission Request: Regional Editor",
        applicant: "Archive Visitor",
        type: "Role application",
        status: "Pending",
        submittedAt: "2026-04-11T09:25:00"
    },
    {
        id: "approval-2",
        title: "Article Review: Temple Banner Iconography",
        applicant: "Team Member 1",
        type: "Article review",
        status: "Pending",
        submittedAt: "2026-04-11T15:40:00"
    }
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const createEmptyPostForm = () => ({
    title: "",
    content: "",
    categoryId: "",
    coverImageUrl: "",
    heritageName: "",
    region: "",
    imageUrls: []
});

const draftCacheKey = "heritage-draft-cache";
const likedPostsStorageKey = "heritage-liked-posts";

const readStoredDraftCache = () => {
    const raw = localStorage.getItem(draftCacheKey);
    if (!raw) {
        return {};
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(draftCacheKey);
        return {};
    }
};

const readStoredUser = () => {
    const raw = localStorage.getItem("heritage-current-user");
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem("heritage-current-user");
        return null;
    }
};

const readStoredLikedPostMap = () => {
    const raw = localStorage.getItem(likedPostsStorageKey);
    if (!raw) {
        return {};
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(likedPostsStorageKey);
        return {};
    }
};

const resolveImageCandidate = (candidate) => {
    if (!candidate) {
        return "";
    }
    if (typeof candidate === "string") {
        return candidate.trim();
    }
    if (typeof candidate === "object") {
        return String(
            candidate.coverImageUrl
            || candidate.imageUrl
            || candidate.url
            || candidate.src
            || candidate.path
            || ""
        ).trim();
    }
    return "";
};

const getPostCategoryName = (post) => {
    const category = post?.category ?? post?.categoryName ?? post?.collectionName ?? "";
    if (typeof category === "string") {
        return category;
    }
    if (category && typeof category === "object") {
        return category.name || category.categoryName || category.title || category.label || "";
    }
    return "";
};

const normaliseCategoryKey = (categoryName) => {
    const rawName = String(categoryName || "").trim();
    const displayName = categoryMap[rawName] || rawName;
    return displayName
        .toLowerCase()
        .replace(/\s*&\s*/g, " & ")
        .replace(/\s+/g, " ")
        .trim();
};

const resolveDefaultCoverImage = (categoryName) =>
    defaultCoverImageMap[normaliseCategoryKey(categoryName)] || defaultCoverFallbackImage;

const resolvePostOwnCoverImage = (post) => {
    const directCover = [
        post?.coverImageUrl,
        post?.coverImage,
        post?.imageUrl,
        post?.mainImageUrl,
        post?.thumbnailUrl
    ].map(resolveImageCandidate).find(Boolean);

    if (directCover) {
        return directCover;
    }

    const imageCollections = [post?.imageUrls, post?.images, post?.media, post?.galleryImages];
    for (const collection of imageCollections) {
        if (!Array.isArray(collection)) {
            continue;
        }
        const firstImage = collection.map(resolveImageCandidate).find(Boolean);
        if (firstImage) {
            return firstImage;
        }
    }

    return "";
};

const resolvePostCoverImage = (post) =>
    resolvePostOwnCoverImage(post) || resolveDefaultCoverImage(getPostCategoryName(post));

const normaliseImageList = (post) => {
    const imageCollections = [post?.imageUrls, post?.images, post?.media, post?.galleryImages];
    for (const collection of imageCollections) {
        if (!Array.isArray(collection)) {
            continue;
        }
        return collection.map(resolveImageCandidate).filter(Boolean);
    }
    return [];
};

const normaliseSummary = (post, index = 0) => ({
    id: post.id ?? 1000 + index,
    title: post.title || "Untitled heritage article",
    coverImageUrl: post.coverImageUrl || "",
    heritageName: post.heritageName || "",
    region: post.region || "",
    status: post.status || "PUBLISHED",
    authorName: post.authorName || post.authorNickname || "Anonymous Contributor",
    categoryId: post.categoryId == null ? "" : String(post.categoryId),
    categoryName: post.categoryName || "传统技艺",
    likeCount: Number(post.likeCount || 0),
    favoriteCount: Number(post.favoriteCount || 0),
    commentCount: Number(post.commentCount || 0),
    viewCount: Number(post.viewCount || 0),
    imageUrls: normaliseImageList(post),
    createdAt: post.createdAt || "2026-04-01T10:00:00"
});

const normaliseDetail = (detail, index = 0) => ({
    ...normaliseSummary(detail, index),
    content: detail.content || "This front-end preview card does not have a full article body yet.",
    likedByCurrentUser: Boolean(detail.likedByCurrentUser),
    imageUrls: Array.isArray(detail.imageUrls) ? detail.imageUrls : [],
    comments: Array.isArray(detail.comments) ? detail.comments : []
});

const buildFallbackSummaries = () =>
    Object.values(fallbackPostDetails).map((detail, index) => normaliseSummary(detail, index));

const normaliseCategories = (items = []) => {
    const seen = new Set();
    const normalised = [];

    items.forEach((category, index) => {
        const name = category?.name;
        if (!name || seen.has(name)) {
            return;
        }

        seen.add(name);
        normalised.push({
            id: category.id ?? 500 + index,
            name,
            description: category.description || categoryDescriptionMap[name] || "",
            createdAt: category.createdAt || "2026-04-01T10:00:00"
        });
    });

    return normalised;
};

const buildFallbackCategories = () => normaliseCategories(fallbackCategories);

const mergeCategoriesWithFallback = (items = []) => {
    return normaliseCategories([...items, ...fallbackCategories]);
};

const mergePostsWithFallback = (items = []) => {
    const primary = items.map((post, index) => normaliseSummary(post, index));
    const merged = [...primary];
    const seenTitles = new Set(primary.map((post) => `${post.title}|${post.categoryName}`));

    for (const post of buildFallbackSummaries()) {
        const key = `${post.title}|${post.categoryName}`;
        if (seenTitles.has(key)) {
            continue;
        }
        merged.push(post);
        seenTitles.add(key);
        if (merged.length >= 8) {
            break;
        }
    }

    return merged;
};

createApp({
    data() {
        return {
            currentView: "home",
            loading: false,
            errorMessage: "",
            successMessage: "",
            categories: [],
            posts: [],
            myPosts: [],
            adminPosts: [],
            pendingQueuePosts: [],
            selectedPostId: null,
            selectedPost: null,
            selectedCategoryFilter: "",
            selectedCategoryFocus: "",
            homeSearchQuery: "",
            appliedHomeSearchQuery: "",
            appliedCategoryFilter: "",
            homepageSearchLoading: false,
            defaultHomepagePostsCache: [],
            hasDefaultHomepagePostsCache: false,
            homepageRequestSequence: 0,
            latestHomepageRequestSequence: 0,
            currentPostPage: 1,
            postPageSize: 8,
            profileSection: "published",
            adminSection: "articles",
            currentUser: readStoredUser(),
            registerForm: {
                username: "",
                nickname: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: ""
            },
            loginForm: {
                username: "",
                password: ""
            },
            profileForm: {
                nickname: "",
                avatarUrl: "",
                bio: ""
            },
            profileEditingMode: "",
            profileAvatarFileLabel: "No file selected",
            authMode: "login",
            authBanner: "",
            postForm: createEmptyPostForm(),
            editingPostId: null,
            editingPostStatus: "",
            editingRejectReason: "",
            coverFileLabel: "No file selected",
            galleryFileLabel: "No files selected",
            commentForm: {
                content: ""
            },
            currentCommentPage: 1,
            commentPageSize: 5,
            likeRequestPending: false,
            workspaceDrafts: [],
            workspacePending: [],
            contributorApplications: [],
            myContributorApplicationStatusFilter: "",
            adminUsers: [],
            adminContributorApplications: [],
            adminApprovals: [],
            adminFilterStatus: "",
            adminTitleQuery: "",
            adminSortOption: "UPDATED_DESC",
            pendingQueueQuery: "",
            pendingQueueReturnToApprovals: false,
            adminPostPage: 0,
            adminPostSize: 10,
            adminPostTotalElements: 0,
            adminPostTotalPages: 0,
            adminPostHasPrevious: false,
            adminPostHasNext: false,
            adminUserPage: 0,
            adminUserSize: 10,
            adminUserTotalElements: 0,
            adminUserTotalPages: 0,
            adminUserHasPrevious: false,
            adminUserHasNext: false,
            adminUserQuery: "",
            adminUserRoleFilter: "",
            adminUserActiveFilter: "",
            adminContributorApplicationQuery: "",
            adminContributorApplicationSortBy: "created_at_desc",
            contributorApplicationRejectReasons: {},
            selectedAdminPostId: null,
            selectedAdminPost: null,
            adminPreviewPostId: null,
            adminPreviewPost: null,
            imagePreviewOpen: false,
            imagePreviewImages: [],
            imagePreviewIndex: 0,
            imagePreviewZoom: 1,
            imagePreviewSource: "",
            adminReviewReason: "",
            draftCache: readStoredDraftCache(),
            likedPostMap: readStoredLikedPostMap(),
            likedPostIds: [],
            contributorApplicationForm: {
                applicationReason: "",
                attachment: null
            },
            attachmentFileLabel: "No file selected"
        };
    },
    computed: {
        isAdmin() {
            return this.currentUser?.role === "ADMIN";
        },
        isContributor() {
            return this.currentUser?.role === "CONTRIBUTOR" || this.currentUser?.role === "ADMIN";
        },
        canAccessContributorWorkspace() {
            return this.isContributor;
        },
        profileBioByteCount() {
            return this.countBytes(this.profileForm.bio);
        },
        postTitleByteLimit() {
            return postTitleByteLimit;
        },
        postContentByteLimit() {
            return postContentByteLimit;
        },
        postTitleByteCount() {
            return this.countBytes(this.postForm.title);
        },
        postContentByteCount() {
            return this.countBytes(this.postForm.content);
        },
        showPermissionRequestModule() {
            return this.currentUser?.role === "USER";
        },
        profileIdentityLabel() {
            if (this.isAdmin) {
                return "Administrator account";
            }
            if (this.isContributor) {
                return "Contributor account";
            }
            return "Member account";
        },
        profileIdentityHeading() {
            if (this.isAdmin) {
                return "Administrator Identity";
            }
            if (this.isContributor) {
                return "Contributor Identity";
            }
            return "User Identity";
        },
        currentViewLabel() {
            const labels = {
                home: "Homepage dashboard",
                detail: "Reading an article",
                publish: this.editingPostId ? "Editing a draft" : "Creating a draft",
                profile: "Personal workspace",
                admin: "Administration workspace",
                auth: "Managing account access"
            };
            return labels[this.currentView] || "Homepage dashboard";
        },
        totalStories() {
            return this.defaultHomepagePostsCache.length;
        },
        totalComments() {
            return this.defaultHomepagePostsCache.reduce((sum, post) => sum + Number(post.commentCount || 0), 0);
        },
        totalContributors() {
            return new Set(this.defaultHomepagePostsCache.map((post) => post.authorName).filter(Boolean)).size;
        },
        visibleCollectionCount() {
            return this.categoryStats.filter((stat) => stat.count > 0).length;
        },
        activeHomepageKeyword() {
            return this.appliedHomeSearchQuery.trim();
        },
        selectedCategoryFilterLabel() {
            if (!this.appliedCategoryFilter) {
                return "";
            }

            const categoryFilter = String(this.appliedCategoryFilter);
            const category = this.categories.find((item) => item.name === categoryFilter || String(item.id) === categoryFilter);
            if (category?.name) {
                return this.translateCategory(category.name);
            }

            const stat = this.categoryStats.find((item) => item.name === categoryFilter || String(item.id) === categoryFilter);
            if (stat?.name) {
                return this.translateCategory(stat.name);
            }

            return this.translateCategory(categoryFilter);
        },
        hasActiveHomepageFilters() {
            return Boolean(this.activeHomepageKeyword || this.appliedCategoryFilter);
        },
        homepageEmptyStateTitle() {
            return this.hasActiveHomepageFilters
                ? "No matching homepage articles"
                : "No published articles are available yet";
        },
        homepageEmptyStateMessage() {
            const keyword = this.activeHomepageKeyword;
            const category = this.selectedCategoryFilterLabel || "the selected collection";

            if (keyword && this.appliedCategoryFilter) {
                return `No articles match "${keyword}" in ${category}. Try another keyword or clear one of the filters.`;
            }
            if (keyword) {
                return `No articles match "${keyword}". Try a broader keyword or clear the search.`;
            }
            if (this.appliedCategoryFilter) {
                return `No articles are available in ${category} right now. Try another collection or clear the filter.`;
            }
            return "The homepage feed is currently empty. Try refreshing again in a moment.";
        },
        hotRankingEmptyMessage() {
            return "No homepage ranking is available yet.";
        },
        filteredPosts() {
            return this.posts;
        },
        articleResultsHeading() {
            return this.hasActiveHomepageFilters ? "Search Results" : "All Articles";
        },
        totalPostPages() {
            return Math.max(1, Math.ceil(this.filteredPosts.length / this.postPageSize));
        },
        hasPostPagination() {
            return this.filteredPosts.length > this.postPageSize;
        },
        paginatedPosts() {
            const page = Math.min(Math.max(this.currentPostPage, 1), this.totalPostPages);
            const start = (page - 1) * this.postPageSize;
            return this.filteredPosts.slice(start, start + this.postPageSize);
        },
        postResultCountLabel() {
            const total = this.filteredPosts.length;
            if (!total) {
                return "0 articles";
            }
            if (!this.hasPostPagination) {
                return `${total} ${total === 1 ? "article" : "articles"}`;
            }
            const start = (Math.min(Math.max(this.currentPostPage, 1), this.totalPostPages) - 1) * this.postPageSize + 1;
            const end = Math.min(start + this.postPageSize - 1, total);
            return `${start}-${end} of ${total} articles`;
        },
        featuredPost() {
            return this.filteredPosts[0] || this.hotPosts[0] || this.posts[0] || null;
        },
        hotPosts() {
            return [...this.defaultHomepagePostsCache]
                .sort((left, right) => this.buildHeatScore(right) - this.buildHeatScore(left))
                .slice(0, 5);
        },
        categoryStats() {
            const categories = this.categories.length
                ? this.categories
                : normaliseCategories(this.defaultHomepagePostsCache.map((post) => ({
                    id: post.categoryId || undefined,
                    name: post.categoryName,
                    description: categoryDescriptionMap[post.categoryName] || ""
                })));
            const counts = categories.map((category) => {
                const categoryId = String(category.id);
                const posts = this.defaultHomepagePostsCache.filter((post) => String(post.categoryId) === categoryId);
                return {
                    id: categoryId,
                    name: category.name,
                    description: category.description || categoryDescriptionMap[category.name] || "",
                    count: posts.length,
                    topPost: [...posts].sort((left, right) => this.buildHeatScore(right) - this.buildHeatScore(left))[0] || null
                };
            });

            const maxCount = counts.reduce((max, item) => Math.max(max, item.count), 0);

            return counts
                .map((item) => ({
                    ...item,
                    percentage: maxCount === 0 ? 0 : Math.max(14, Math.round((item.count / maxCount) * 100))
                }))
                .sort((left, right) => right.count - left.count);
        },
        categoryPieLegendItems() {
            const items = this.categoryStats.filter((stat) => stat.count > 0);
            const total = items.reduce((sum, stat) => sum + Number(stat.count || 0), 0);
            return items.map((stat, index) => {
                const count = Number(stat.count || 0);
                return {
                    id: stat.id,
                    name: this.translateCategory(stat.name),
                    count,
                    percent: total ? Math.round((count / total) * 100) : 0,
                    color: categoryPieColors[index % categoryPieColors.length]
                };
            });
        },
        focusedCategory() {
            const availableCategoryIds = this.categoryStats
                .filter((stat) => stat.count > 0)
                .map((stat) => String(stat.id));

            if (this.appliedCategoryFilter) {
                const appliedCategoryId = this.resolveCategoryId(this.appliedCategoryFilter) || String(this.appliedCategoryFilter);
                return availableCategoryIds.includes(appliedCategoryId)
                    ? appliedCategoryId
                    : "";
            }

            if (this.selectedCategoryFocus && availableCategoryIds.includes(this.selectedCategoryFocus)) {
                return this.selectedCategoryFocus;
            }

            return availableCategoryIds[0] || "";
        },
        focusedCategoryName() {
            if (!this.focusedCategory) {
                return "";
            }

            const stat = this.categoryStats.find((item) => String(item.id) === String(this.focusedCategory));
            if (stat) {
                return stat.name;
            }

            const category = this.categories.find((item) => String(item.id) === String(this.focusedCategory));
            return category?.name || "";
        },
        focusedCategoryPosts() {
            if (!this.focusedCategory) {
                return [];
            }
            return this.filteredPosts.filter((post) => String(post.categoryId) === String(this.focusedCategory));
        },
        profilePublishedPosts() {
            return this.myPosts.filter((post) => post.status === "PUBLISHED");
        },
        likedPosts() {
            return this.defaultHomepagePostsCache.filter((post) => this.likedPostIds.includes(Number(post.id)));
        },
        selectedPostLiked() {
            if (!this.selectedPost?.id) {
                return false;
            }
            return Boolean(this.selectedPost.likedByCurrentUser);
        },
        selectedPostComments() {
            return Array.isArray(this.selectedPost?.comments) ? this.selectedPost.comments : [];
        },
        totalCommentPages() {
            return Math.max(1, Math.ceil(this.selectedPostComments.length / this.commentPageSize));
        },
        hasCommentPagination() {
            return this.selectedPostComments.length > this.commentPageSize;
        },
        paginatedComments() {
            const page = Math.min(Math.max(this.currentCommentPage, 1), this.totalCommentPages);
            const start = (page - 1) * this.commentPageSize;
            return this.selectedPostComments.slice(start, start + this.commentPageSize);
        },
        commentPaginationLabel() {
            if (!this.selectedPostComments.length) {
                return "No comments";
            }
            return `Page ${Math.min(this.currentCommentPage, this.totalCommentPages)} of ${this.totalCommentPages}`;
        },
        profileSummary() {
            return {
                published: this.profilePublishedPosts.length,
                pending: this.workspacePending.length,
                drafts: this.workspaceDrafts.length,
                liked: this.likedPosts.length,
                requests: this.contributorApplications.length
            };
        },
        adminArticles() {
            return this.adminPosts;
        },
        adminResultSummary() {
            const filters = [];
            if (this.adminFilterStatus) {
                filters.push(this.statusLabel(this.adminFilterStatus));
            }
            if (this.adminTitleQuery.trim()) {
                filters.push(`"${this.adminTitleQuery.trim()}"`);
            }
            return filters.length ? `Showing: ${filters.join(" · ")}` : "Showing: All articles";
        },
        adminResultCountLabel() {
            const currentCount = this.adminArticles.length;
            const totalCount = this.adminPostTotalElements || 0;
            if (!totalCount) {
                return `${currentCount} result${currentCount === 1 ? "" : "s"}`;
            }
            return `${currentCount} of ${totalCount} result${totalCount === 1 ? "" : "s"}`;
        },
        adminSortSummary() {
            return `Sorted by: ${this.adminSortLabel(this.adminSortOption)}`;
        },
        adminPaginationLabel() {
            if (!this.adminPostTotalPages) {
                return "Page 1 of 1";
            }
            return `Page ${this.adminPostPage + 1} of ${this.adminPostTotalPages}`;
        },
        adminUserPaginationLabel() {
            if (!this.adminUserTotalPages) {
                return "Page 1 of 1";
            }
            return `Page ${this.adminUserPage + 1} of ${this.adminUserTotalPages}`;
        },
        adminKpiCards() {
            const reviewQueueCount = this.adminApprovalsView.length;
            return [
                {
                    label: "Managed Articles",
                    value: this.adminArticles.length,
                    detail: "Draft, review, published, and archived article states.",
                    microLabel: "Total",
                    badgeTone: "neutral",
                    targetSection: "articles",
                    isActive: this.adminSection === "articles",
                    isAlert: false
                },
                {
                    label: "Managed Users",
                    value: this.adminUserTotalElements || this.adminUsersView.length,
                    detail: "Accounts with role and activity controls.",
                    microLabel: "Total",
                    badgeTone: "neutral",
                    targetSection: "users",
                    isActive: this.adminSection === "users",
                    isAlert: false
                },
                {
                    label: "Contributor Applications",
                    value: this.adminContributorApplications.length,
                    detail: "Pending contributor access requests.",
                    microLabel: "Pending",
                    badgeTone: "pending",
                    targetSection: "contributor-review",
                    isActive: this.adminSection === "contributor-review",
                    isAlert: false
                },
                {
                    label: "Article Review Queue",
                    value: reviewQueueCount,
                    detail: "Pending article reviews waiting for action.",
                    microLabel: reviewQueueCount > 0 ? "Needs action" : "Clear",
                    badgeTone: reviewQueueCount > 0 ? "alert" : "clear",
                    targetSection: "approvals",
                    isActive: this.adminSection === "approvals",
                    isAlert: reviewQueueCount > 0
                }
            ];
        },
        adminSortColumnLabel() {
            if (this.adminSortOption === "SUBMITTED_DESC") {
                return "Submitted";
            }
            if (this.adminSortOption === "REVIEWED_DESC") {
                return "Reviewed";
            }
            return "Updated";
        },
        adminUsersView() {
            return this.adminUsers
                .map((user) => ({
                    ...user,
                    status: user.active ? "Active" : "Inactive",
                    contributions: user.contributionCount || 0
                }));
        },
        adminUserResultCountLabel() {
            const total = this.adminUserTotalElements;
            if (!total) {
                return "Showing 0 of 0 users";
            }

            const start = this.adminUserPage * this.adminUserSize + 1;
            const end = Math.min(start + this.adminUsersView.length - 1, total);
            return `Showing ${start}-${end} of ${total} users`;
        },
        adminUserFilterSummary() {
            const parts = [];

            if (this.adminUserRoleFilter) {
                parts.push(this.roleLabel(this.adminUserRoleFilter));
            }

            if (this.adminUserActiveFilter === "active") {
                parts.push("Active");
            } else if (this.adminUserActiveFilter === "inactive") {
                parts.push("Inactive");
            }

            if (this.adminUserQuery.trim()) {
                parts.push(`"${this.adminUserQuery.trim()}"`);
            }

            if (!parts.length) {
                return "Showing: All users";
            }

            return `Showing: ${parts.join(" · ")}`;
        },
        adminContributorApplicationsView() {
            const query = this.adminContributorApplicationQuery.trim().toLowerCase();
            return this.adminContributorApplications.filter((application) => {
                if (!query) {
                    return true;
                }
                return String(application.applicantUsername || "")
                    .toLowerCase()
                    .includes(query);
            });
        },
        adminContributorApplicationResultCountLabel() {
            const count = this.adminContributorApplicationsView.length;
            return `${count} result${count === 1 ? "" : "s"}`;
        },
        adminContributorApplicationFilterSummary() {
            const parts = [];

            if (this.adminContributorApplicationQuery.trim()) {
                parts.push(`"${this.adminContributorApplicationQuery.trim()}"`);
            }

            if (!parts.length) {
                return "Showing: Pending applications";
            }

            return `Showing: ${parts.join(" · ")}`;
        },
        adminContributorApplicationEmptyLabel() {
            if (!this.adminContributorApplications.length) {
                return "No pending contributor applications right now.";
            }
            return "No pending contributor applications match the current filter.";
        },
        adminApprovalsView() {
            const query = this.pendingQueueQuery.trim().toLowerCase();
            return this.pendingQueuePosts
                .filter((post) => !query || [post.title, this.translateText(post.title)]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(query))
                .map((post) => ({
                    id: `approval-${post.id}`,
                    postId: post.id,
                    title: post.title,
                    authorName: post.authorName,
                    reviewerName: post.reviewerName || "",
                    status: post.status,
                    submittedAt: post.submittedAt || post.updatedAt
                }));
        },
        pendingQueueSummaryLabel() {
            const waitingCount = this.pendingQueuePosts.length;
            const filteredCount = this.adminApprovalsView.length;
            if (!waitingCount) {
                return "0 items waiting";
            }
            if (!this.pendingQueueQuery.trim()) {
                return `${waitingCount} item${waitingCount === 1 ? "" : "s"} waiting`;
            }
            return `${filteredCount} of ${waitingCount} item${waitingCount === 1 ? "" : "s"} waiting`;
        },
        pendingQueueSearchSummary() {
            if (!this.pendingQueueQuery.trim()) {
                return "Queue shows all pending items only.";
            }
            return `Searching queue titles for "${this.pendingQueueQuery.trim()}".`;
        },
        pendingQueueEmptyLabel() {
            if (!this.pendingQueuePosts.length) {
                return "No pending article reviews right now.";
            }
            return "No pending article reviews match the current queue search.";
        },
        myContributorApplicationsView() {
            return this.contributorApplications.filter((application) => {
                if (!this.myContributorApplicationStatusFilter) {
                    return true;
                }
                return application.status === this.myContributorApplicationStatusFilter;
            });
        },
        myContributorApplicationResultCountLabel() {
            const count = this.myContributorApplicationsView.length;
            return `${count} result${count === 1 ? "" : "s"}`;
        },
        myContributorApplicationFilterSummary() {
            if (!this.myContributorApplicationStatusFilter) {
                return "Showing: All requests";
            }
            return `Showing: ${this.statusLabel(this.myContributorApplicationStatusFilter)}`;
        },
        myContributorApplicationEmptyLabel() {
            if (!this.contributorApplications.length) {
                return "No contributor applications submitted yet.";
            }
            return "No contributor applications match the current filter.";
        },
        canApplyForContributor() {
            return this.currentUser?.role === "USER"
                && !this.contributorApplications.some((application) => application.status === "PENDING");
        },
        latestContributorApplication() {
            return this.contributorApplications[0] || null;
        },
        canSubmitForReview() {
            return Boolean(this.editingPostId) && ["DRAFT", "REJECTED"].includes(this.editingPostStatus);
        },
        publishPrimaryLabel() {
            return this.editingPostId ? "Update draft" : "Save draft";
        },
        currentPreviewImage() {
            return this.imagePreviewImages[this.imagePreviewIndex] || "";
        },
        hasPreviewNavigation() {
            return this.imagePreviewImages.length > 1;
        },
        imagePreviewScaleLabel() {
            return `${Math.round(this.imagePreviewZoom * 100)}%`;
        }
    },
    watch: {
        defaultHomepagePostsCache: {
            handler() {
                this.$nextTick(() => {
                    if (this.currentView === "home") {
                        this.renderCharts();
                    }
                });
            },
            deep: true
        }
    },
    async mounted() {
        await this.fetchHomepageData();
        if (this.currentUser) {
            this.syncProfileFormFromCurrentUser();
            this.syncLikedPostsFromStorage();
            await this.refreshWorkspaceData();
        }
        this.handleHash();
        window.addEventListener("hashchange", this.handleHash);
        window.addEventListener("keydown", this.handleGlobalKeydown);
        this.syncBodyScrollLock();
    },
    beforeUnmount() {
        window.removeEventListener("hashchange", this.handleHash);
        window.removeEventListener("keydown", this.handleGlobalKeydown);
        window.removeEventListener("resize", this.handleChartResize);
        document.body.classList.remove("body--modal-open");
    },
    methods: {
        redirectGuestToRegister(message = "Sign in before viewing your profile.") {
            this.currentView = "auth";
            this.authMode = "login";
            this.authBanner = message;
            this.errorMessage = "";
            window.location.hash = "#auth";
            this.focusAuthInput("loginUsernameInput");
        },
        currentLikedPostsKey() {
            return this.currentUser?.id ? String(this.currentUser.id) : "";
        },
        syncLikedPostsFromStorage() {
            const key = this.currentLikedPostsKey();
            if (!key) {
                this.likedPostIds = [];
                return;
            }
            const stored = this.likedPostMap[key];
            this.likedPostIds = Array.isArray(stored)
                ? [...new Set(stored.map((id) => Number(id)).filter((id) => Number.isFinite(id)))]
                : [];
        },
        persistLikedPosts() {
            localStorage.setItem(likedPostsStorageKey, JSON.stringify(this.likedPostMap));
        },
        isPostLiked(postId) {
            return this.likedPostIds.includes(Number(postId));
        },
        displayLikeCount(post) {
            if (!post) {
                return 0;
            }
            return Number(post.likeCount || 0);
        },
        applyPostLikeState(postId, likeCount, likedByCurrentUser) {
            const matchesPost = (post) => String(post?.id) === String(postId);
            const applyState = (post) => {
                if (!post) {
                    return;
                }
                post.likeCount = Number(likeCount || 0);
                post.likedByCurrentUser = Boolean(likedByCurrentUser);
            };

            if (matchesPost(this.selectedPost)) {
                applyState(this.selectedPost);
            }
            applyState(this.defaultHomepagePostsCache.find(matchesPost));
            applyState(this.posts.find(matchesPost));
            if (fallbackPostDetails[postId]) {
                applyState(fallbackPostDetails[postId]);
            }
        },
        setStoredLike(postId, liked) {
            const key = this.currentLikedPostsKey();
            if (!key) {
                return;
            }
            const numericPostId = Number(postId);
            const current = new Set(this.likedPostIds.map((id) => Number(id)));
            if (liked) {
                current.add(numericPostId);
            } else {
                current.delete(numericPostId);
            }
            this.likedPostIds = [...current];
            this.likedPostMap[key] = [...this.likedPostIds];
            this.persistLikedPosts();
        },
        async toggleLike(post, syncOnly = false) {
            if (!post?.id) {
                return;
            }
            if (!this.currentUser) {
                this.redirectGuestToRegister("Sign in before opening your profile or liking articles.");
                return;
            }

            const postId = Number(post.id);
            if (syncOnly) {
                this.setStoredLike(postId, true);
                return;
            }

            if (fallbackPostDetails[postId]) {
                const liked = !this.isPostLiked(postId);
                const likeCount = Math.max(0, Number(post.likeCount || 0) + (liked ? 1 : -1));
                this.applyPostLikeState(postId, likeCount, liked);
                this.setStoredLike(postId, liked);
                this.showSuccess(liked ? "Article liked successfully." : "Article like removed.");
                return;
            }

            if (this.likeRequestPending) {
                return;
            }
            this.likeRequestPending = true;
            try {
                const data = await this.request(`/api/posts/${postId}/like`, {
                    method: "POST"
                }, "", null, true);
                if (data) {
                    const liked = Boolean(data.likedByCurrentUser);
                    if (String(this.selectedPost?.id) === String(postId)) {
                        this.selectedPost = normaliseDetail(data);
                    }
                    this.applyPostLikeState(postId, data.likeCount, liked);
                    this.setStoredLike(postId, liked);
                    this.showSuccess(liked ? "Article liked successfully." : "Article like removed.");
                }
            } finally {
                this.likeRequestPending = false;
            }
        },
        syncProfileFormFromCurrentUser() {
            this.profileForm.nickname = this.currentUser?.nickname || "";
            this.profileForm.avatarUrl = this.currentUser?.avatarUrl || "";
            this.profileForm.bio = this.currentUser?.bio || "";
            this.profileAvatarFileLabel = "No file selected";
        },
        mergeCurrentUserProfile(profile) {
            if (!this.currentUser || !profile) {
                return;
            }
            this.currentUser = {
                ...this.currentUser,
                ...profile
            };
            this.storeUser(this.currentUser);
            this.syncProfileFormFromCurrentUser();
        },
        ensureAccessibleProfileSection() {
            const allowedSections = this.canAccessContributorWorkspace
                ? ["published", "pending", "drafts", "liked"]
                : (this.showPermissionRequestModule ? ["liked", "permissions"] : ["liked"]);
            if (!allowedSections.includes(this.profileSection)) {
                this.profileSection = allowedSections[0];
            }
        },
        openProfileEditor(mode) {
            this.profileEditingMode = mode;
            this.syncProfileFormFromCurrentUser();
        },
        closeProfileEditor() {
            this.profileEditingMode = "";
            this.syncProfileFormFromCurrentUser();
        },
        navigate(view, updateHash = true) {
            let nextView = view;

            if (this.imagePreviewOpen) {
                this.closeImagePreview();
            }

            if (view === "profile" && !this.currentUser) {
                this.redirectGuestToRegister("Sign in before viewing your profile.");
                return;
            }

            if (view === "publish" && !this.isContributor) {
                this.showError("Please sign in as a contributor to access the drafts page.");
                nextView = this.currentUser ? "profile" : "auth";
            }

            if (view === "admin" && !this.isAdmin) {
                this.showError("Sign in with the administrator account to open the admin preview.");
                nextView = this.currentUser ? "profile" : "auth";
            }

            if (nextView !== "admin") {
                this.closeAdminPostPreview();
            }

            this.currentView = nextView;
            if (nextView === "auth") {
                this.authMode = "login";
            }
            if (nextView === "profile" && this.currentUser) {
                this.ensureAccessibleProfileSection();
                this.refreshWorkspaceData();
            }
            if (nextView === "admin" && this.isAdmin) {
                this.warmAdminDashboardData();
            }
            if (updateHash) {
                window.location.hash = `#${nextView}`;
            }
        },
        handleHash() {
            const hash = window.location.hash.replace("#", "");
            if (this.imagePreviewOpen) {
                this.closeImagePreview();
            }
            if (!hash || hash === "home") {
                this.currentView = "home";
                return;
            }

            if (hash.startsWith("detail-")) {
                const id = Number(hash.replace("detail-", ""));
                if (id) {
                    this.openPost(id);
                }
                return;
            }

            if (hash === "categories") {
                this.navigate("home", false);
                this.focusCollections(false);
                return;
            }

            const supported = ["home", "publish", "profile", "admin", "auth"];
            if (supported.includes(hash)) {
                this.navigate(hash, false);
            }
        },
        handleGlobalKeydown(event) {
            if (this.imagePreviewOpen) {
                if (event.key === "Escape") {
                    this.closeImagePreview();
                    return;
                }
                if (event.key === "ArrowLeft" && this.hasPreviewNavigation) {
                    event.preventDefault();
                    this.showPreviousPreviewImage();
                    return;
                }
                if (event.key === "ArrowRight" && this.hasPreviewNavigation) {
                    event.preventDefault();
                    this.showNextPreviewImage();
                    return;
                }
            }

            if (event.key === "Escape" && this.adminPreviewPost) {
                this.closeAdminPostPreview();
            }
        },
        syncBodyScrollLock() {
            document.body.classList.toggle("body--modal-open", this.imagePreviewOpen || Boolean(this.adminPreviewPost));
        },
        buildPreviewImageList(images = []) {
            return [...new Set((Array.isArray(images) ? images : []).filter(Boolean))];
        },
        openImagePreview(images = [], startIndex = 0, source = "detail") {
            const previewImages = this.buildPreviewImageList(images);
            if (!previewImages.length) {
                return;
            }

            const safeIndex = Math.min(Math.max(Number(startIndex) || 0, 0), previewImages.length - 1);
            this.imagePreviewImages = previewImages;
            this.imagePreviewIndex = safeIndex;
            this.imagePreviewZoom = 1;
            this.imagePreviewSource = source;
            this.imagePreviewOpen = true;
            this.syncBodyScrollLock();
        },
        closeImagePreview() {
            this.imagePreviewOpen = false;
            this.imagePreviewImages = [];
            this.imagePreviewIndex = 0;
            this.imagePreviewZoom = 1;
            this.imagePreviewSource = "";
            this.syncBodyScrollLock();
        },
        resetImagePreviewZoom() {
            this.imagePreviewZoom = 1;
        },
        updateImagePreviewZoom(nextZoom) {
            const boundedZoom = Math.min(Math.max(nextZoom, 0.6), 3);
            this.imagePreviewZoom = Math.round(boundedZoom * 100) / 100;
        },
        zoomImagePreviewIn() {
            this.updateImagePreviewZoom(this.imagePreviewZoom + 0.2);
        },
        zoomImagePreviewOut() {
            this.updateImagePreviewZoom(this.imagePreviewZoom - 0.2);
        },
        handleImagePreviewWheel(event) {
            if (!this.imagePreviewOpen) {
                return;
            }
            event.preventDefault();
            if (event.deltaY < 0) {
                this.zoomImagePreviewIn();
                return;
            }
            this.zoomImagePreviewOut();
        },
        showPreviewImage(index) {
            if (!this.imagePreviewImages.length) {
                return;
            }
            const safeIndex = Math.min(Math.max(Number(index) || 0, 0), this.imagePreviewImages.length - 1);
            this.imagePreviewIndex = safeIndex;
            this.resetImagePreviewZoom();
        },
        showPreviousPreviewImage() {
            if (!this.hasPreviewNavigation) {
                return;
            }
            const nextIndex = (this.imagePreviewIndex - 1 + this.imagePreviewImages.length) % this.imagePreviewImages.length;
            this.showPreviewImage(nextIndex);
        },
        showNextPreviewImage() {
            if (!this.hasPreviewNavigation) {
                return;
            }
            const nextIndex = (this.imagePreviewIndex + 1) % this.imagePreviewImages.length;
            this.showPreviewImage(nextIndex);
        },
        openDetailGalleryPreview(startIndex = 0) {
            this.openImagePreview(this.selectedPost?.imageUrls || [], startIndex, "public-detail");
        },
        buildAdminPreviewImages() {
            if (!this.adminPreviewPost) {
                return [];
            }
            return this.buildPreviewImageList([
                this.getPostOwnCoverImage(this.adminPreviewPost),
                ...(Array.isArray(this.adminPreviewPost.imageUrls) ? this.adminPreviewPost.imageUrls : [])
            ]);
        },
        openAdminCoverPreview() {
            this.openImagePreview(this.buildAdminPreviewImages(), 0, "admin-preview");
        },
        openAdminGalleryPreview(imageUrl, galleryIndex = 0) {
            const previewImages = this.buildAdminPreviewImages();
            const previewIndex = previewImages.indexOf(imageUrl);
            this.openImagePreview(previewImages, previewIndex >= 0 ? previewIndex : galleryIndex + 1, "admin-preview");
        },
        authHeaders(baseHeaders = {}) {
            const headers = { ...baseHeaders };
            if (this.currentUser?.token) {
                headers["Authorization"] = `Bearer ${this.currentUser.token}`;
            }
            return headers;
        },
        async warmAdminDashboardData() {
            if (!this.isAdmin) {
                return;
            }
            await Promise.all([
                this.fetchAdminPosts(),
                this.fetchAdminUsers(),
                this.fetchAdminContributorApplications(),
                this.fetchPendingQueue()
            ]);
        },
        handleChartResize() {
            ["chart-posts", "chart-comments", "chart-categories"].forEach((id) => {
                const dom = document.getElementById(id);
                if (dom && typeof echarts !== "undefined") {
                    echarts.getInstanceByDom(dom)?.resize();
                }
            });
        },
        readHomepageSearchStateFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const categoryName = (params.get("category") || "").trim();
            const legacyCategoryId = (params.get("categoryId") || "").trim();
            return {
                keyword: (params.get("keyword") || "").trim(),
                categoryName: categoryName || this.resolveCategoryName(legacyCategoryId)
            };
        },
        syncHomepageSearchStateToUrl() {
            const url = new URL(window.location.href);
            const keyword = this.appliedHomeSearchQuery.trim();
            const categoryName = this.appliedCategoryFilter ? String(this.appliedCategoryFilter) : "";

            if (keyword) {
                url.searchParams.set("keyword", keyword);
            } else {
                url.searchParams.delete("keyword");
            }

            url.searchParams.delete("categoryId");
            if (categoryName) {
                url.searchParams.set("category", categoryName);
            } else {
                url.searchParams.delete("category");
            }

            const nextSearch = url.searchParams.toString();
            const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}${url.hash}`;
            window.history.replaceState({}, "", nextUrl);
        },
        cacheDefaultHomepagePosts(posts) {
            this.defaultHomepagePostsCache = clone(posts);
            this.hasDefaultHomepagePostsCache = true;
        },
        applyHomepageSearchState(keyword, categoryName) {
            this.appliedHomeSearchQuery = (keyword || "").trim();
            this.appliedCategoryFilter = categoryName ? String(categoryName).trim() : "";
        },
        normaliseHomepagePosts(items = []) {
            return items.map((post, index) => {
                const summary = normaliseSummary(post, index);
                return {
                    ...summary,
                    categoryId: summary.categoryId || this.resolveCategoryId(summary.categoryName)
                };
            });
        },
        resetPostPagination() {
            this.currentPostPage = 1;
        },
        ensurePostPageInRange() {
            this.currentPostPage = Math.min(Math.max(Number(this.currentPostPage) || 1, 1), this.totalPostPages);
        },
        previousPostPage() {
            this.goToPostPage(this.currentPostPage - 1);
        },
        nextPostPage() {
            this.goToPostPage(this.currentPostPage + 1);
        },
        goToPostPage(page) {
            const nextPage = Math.min(Math.max(Number(page) || 1, 1), this.totalPostPages);
            this.currentPostPage = nextPage;
        },
        async fetchHomepageData() {
            this.errorMessage = "";
            await this.fetchCategories();
            const initialState = this.readHomepageSearchStateFromUrl();
            this.homeSearchQuery = initialState.keyword;
            this.selectedCategoryFilter = initialState.categoryName;
            if (initialState.keyword || initialState.categoryName) {
                await this.ensureDefaultHomepagePostsCache();
            }
            this.applyHomepageSearchState(initialState.keyword, initialState.categoryName);
            await this.fetchPosts({ allowFallback: true });
            window.addEventListener("resize", this.handleChartResize);
        },
        async fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                const payload = await response.json();
                if (!response.ok || !payload?.success || !Array.isArray(payload.data)) {
                    throw new Error(this.translateBackendMessage(payload?.message) || "Unable to load homepage categories.");
                }
                this.categories = normaliseCategories(payload.data);
            } catch (error) {
                this.categories = buildFallbackCategories();
            } finally {
                if (!this.selectedCategoryFocus && this.categories.length) {
                    this.selectedCategoryFocus = String(this.categories[0].id);
                }
            }
        },
        async fetchPosts(options = {}) {
            const {
                allowFallback = false,
                showGlobalLoading = true,
                useHomepageSearchLoading = false
            } = options;
            const params = new URLSearchParams();
            const keyword = this.homeSearchQuery.trim();
            const categoryName = this.selectedCategoryFilter ? String(this.selectedCategoryFilter).trim() : "";
            if (keyword) {
                params.set("keyword", keyword);
            }
            if (categoryName) {
                params.set("category", categoryName);
            }
            const query = params.toString();
            const requestSequence = ++this.homepageRequestSequence;
            this.latestHomepageRequestSequence = requestSequence;
            const isDefaultRequest = !keyword && !categoryName;

            this.applyHomepageSearchState(keyword, categoryName);
            this.syncHomepageSearchStateToUrl();

            if (showGlobalLoading) {
                this.loading = true;
            }
            if (useHomepageSearchLoading) {
                this.homepageSearchLoading = true;
            }
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/posts${query ? `?${query}` : ""}`);
                const payload = await response.json();
                if (!response.ok || !payload?.success || !Array.isArray(payload.data)) {
                    throw new Error(this.translateBackendMessage(payload?.message) || "Unable to load the homepage article feed.");
                }
                if (requestSequence !== this.latestHomepageRequestSequence) {
                    return;
                }
                const normalisedPosts = this.normaliseHomepagePosts(payload.data);
                this.posts = normalisedPosts;
                this.ensurePostPageInRange();
                if (isDefaultRequest) {
                    this.cacheDefaultHomepagePosts(normalisedPosts);
                }
            } catch (error) {
                if (requestSequence !== this.latestHomepageRequestSequence) {
                    return;
                }
                if (allowFallback) {
                    const fallbackPosts = this.normaliseHomepagePosts(buildFallbackSummaries());
                    this.posts = fallbackPosts;
                    this.ensurePostPageInRange();
                    if (isDefaultRequest) {
                        this.cacheDefaultHomepagePosts(fallbackPosts);
                    }
                    this.showError("The live homepage feed is unavailable, so the front-end demo content is being shown instead.");
                } else {
                    this.posts = [];
                    this.ensurePostPageInRange();
                    this.showError(error.message || "Unable to load the homepage article feed.");
                }
            } finally {
                if (requestSequence === this.latestHomepageRequestSequence) {
                    if (showGlobalLoading) {
                        this.loading = false;
                    }
                    if (useHomepageSearchLoading) {
                        this.homepageSearchLoading = false;
                    }
                }
            }
        },
        async ensureDefaultHomepagePostsCache() {
            if (this.hasDefaultHomepagePostsCache) {
                return;
            }

            try {
                const response = await fetch("/api/posts");
                const payload = await response.json();
                if (!response.ok || !payload?.success || !Array.isArray(payload.data)) {
                    throw new Error(this.translateBackendMessage(payload?.message) || "Unable to load the default homepage article feed.");
                }
                this.cacheDefaultHomepagePosts(this.normaliseHomepagePosts(payload.data));
            } catch (error) {
                this.cacheDefaultHomepagePosts(this.normaliseHomepagePosts(buildFallbackSummaries()));
            }
        },
        async triggerHomepageSearch() {
            const nextKeyword = this.homeSearchQuery.trim();
            const nextCategoryName = this.selectedCategoryFilter ? String(this.selectedCategoryFilter).trim() : "";

            this.resetPostPagination();
            this.applyHomepageSearchState(nextKeyword, nextCategoryName);
            this.syncHomepageSearchStateToUrl();

            await this.fetchPosts({
                allowFallback: !nextKeyword && !nextCategoryName,
                showGlobalLoading: false,
                useHomepageSearchLoading: true
            });
        },
        async handleHomepageSearchEnter() {
            await this.triggerHomepageSearch();
        },
        async fetchMyProfile() {
            if (!this.currentUser) {
                return;
            }
            const data = await this.request("/api/my/profile", {
                method: "GET"
            }, "", null, true);
            if (data) {
                this.mergeCurrentUserProfile(data);
            }
        },
        async fetchMyPosts() {
            if (!this.currentUser) {
                this.myPosts = [];
                this.workspaceDrafts = [];
                this.workspacePending = [];
                return;
            }
            const data = await this.request("/api/my/posts", {
                method: "GET"
            }, "", null, true);
            if (!Array.isArray(data)) {
                return;
            }
            this.myPosts = data;
            this.workspaceDrafts = data.filter((post) => post.status === "DRAFT" || post.status === "REJECTED");
            this.workspacePending = data.filter((post) => post.status === "PENDING_REVIEW");
            if (this.editingPostId) {
                const currentEditingPost = data.find((post) => post.id === this.editingPostId);
                if (currentEditingPost) {
                    this.editingPostStatus = currentEditingPost.status;
                    this.editingRejectReason = currentEditingPost.rejectReason || "";
                }
            }
        },
        async fetchMyContributorApplications() {
            if (!this.currentUser) {
                this.contributorApplications = [];
                return;
            }
            const data = await this.request("/api/my/contributor-applications", {
                method: "GET"
            }, "", null, true);
            if (Array.isArray(data)) {
                this.contributorApplications = data;
            }
        },
        async fetchAdminPosts() {
            if (!this.isAdmin) {
                this.adminPosts = [];
                this.adminPostTotalElements = 0;
                this.adminPostTotalPages = 0;
                this.adminPostHasPrevious = false;
                this.adminPostHasNext = false;
                return;
            }
            const params = new URLSearchParams();
            if (this.adminFilterStatus) {
                params.set("status", this.adminFilterStatus);
            }
            if (this.adminTitleQuery.trim()) {
                params.set("title", this.adminTitleQuery.trim());
            }
            if (this.adminSortOption) {
                params.set("sort", this.adminSortOption);
            }
            params.set("page", String(this.adminPostPage));
            params.set("size", String(this.adminPostSize));
            const query = params.toString();
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/admin/posts${query ? `?${query}` : ""}`, {
                    method: "GET",
                    headers: this.authHeaders()
                });
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "The request could not be completed.");
                }
                const data = Array.isArray(payload.data) ? payload.data : [];
                const totalElements = Number(response.headers.get("X-Total-Elements") || data.length || 0);
                const totalPages = Number(response.headers.get("X-Total-Pages") || (data.length ? 1 : 0));
                const hasPrevious = (response.headers.get("X-Has-Previous") || "false") === "true";
                const hasNext = (response.headers.get("X-Has-Next") || "false") === "true";

                if (this.adminPostPage > 0 && !data.length && totalElements > 0) {
                    this.adminPostPage -= 1;
                    await this.fetchAdminPosts();
                    return;
                }

                this.adminPosts = data;
                this.adminPostTotalElements = totalElements;
                this.adminPostTotalPages = totalPages;
                this.adminPostHasPrevious = hasPrevious;
                this.adminPostHasNext = hasNext;
            } catch (error) {
                this.showError(error.message || "The request could not be completed.");
            }
        },
        async fetchPendingQueue() {
            if (!this.isAdmin) {
                this.pendingQueuePosts = [];
                return;
            }
            const data = await this.request("/api/admin/posts?status=PENDING_REVIEW", {
                method: "GET"
            }, "", null, true);
            if (Array.isArray(data)) {
                this.pendingQueuePosts = data;
            }
        },
        async fetchAdminContributorApplications() {
            if (!this.isAdmin) {
                this.adminContributorApplications = [];
                return;
            }
            const params = new URLSearchParams();
            params.set("status", "PENDING");
            if (this.adminContributorApplicationSortBy) {
                params.set("sortBy", this.adminContributorApplicationSortBy);
            }
            const query = params.toString();
            const data = await this.request(`/api/admin/contributor-applications${query ? `?${query}` : ""}`, {
                method: "GET"
            }, "", null, true);
            if (Array.isArray(data)) {
                this.adminContributorApplications = data;
                const nextRejectReasons = {};
                for (const application of data) {
                    nextRejectReasons[application.id] = this.contributorApplicationRejectReasons[application.id] || "";
                }
                this.contributorApplicationRejectReasons = nextRejectReasons;
            }
        },
        async fetchAdminUsers() {
            if (!this.isAdmin) {
                this.adminUsers = [];
                this.adminUserTotalElements = 0;
                this.adminUserTotalPages = 0;
                this.adminUserHasPrevious = false;
                this.adminUserHasNext = false;
                return;
            }
            const params = new URLSearchParams();
            if (this.adminUserQuery.trim()) {
                params.set("username", this.adminUserQuery.trim());
            }
            if (this.adminUserRoleFilter) {
                params.set("role", this.adminUserRoleFilter);
            }
            if (this.adminUserActiveFilter === "active") {
                params.set("active", "true");
            } else if (this.adminUserActiveFilter === "inactive") {
                params.set("active", "false");
            }
            params.set("page", String(this.adminUserPage));
            params.set("size", String(this.adminUserSize));
            const query = params.toString();
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/admin/users${query ? `?${query}` : ""}`, {
                    method: "GET",
                    headers: this.authHeaders()
                });
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "The request could not be completed.");
                }
                const data = Array.isArray(payload.data) ? payload.data : [];
                const totalElements = Number(response.headers.get("X-Total-Elements") || data.length || 0);
                const totalPages = Number(response.headers.get("X-Total-Pages") || (data.length ? 1 : 0));
                const hasPrevious = (response.headers.get("X-Has-Previous") || "false") === "true";
                const hasNext = (response.headers.get("X-Has-Next") || "false") === "true";

                if (this.adminUserPage > 0 && !data.length && totalElements > 0) {
                    this.adminUserPage -= 1;
                    await this.fetchAdminUsers();
                    return;
                }

                this.adminUsers = data;
                this.adminUserTotalElements = totalElements;
                this.adminUserTotalPages = totalPages;
                this.adminUserHasPrevious = hasPrevious;
                this.adminUserHasNext = hasNext;
            } catch (error) {
                this.showError(error.message || "The request could not be completed.");
            }
        },
        async searchAdminPosts() {
            this.adminPostPage = 0;
            await this.fetchAdminPosts();
        },
        async clearAdminSearch() {
            this.adminTitleQuery = "";
            this.adminFilterStatus = "";
            this.adminSortOption = "UPDATED_DESC";
            this.adminPostPage = 0;
            this.adminPostSize = 10;
            await this.fetchAdminPosts();
        },
        async goToPreviousAdminPostPage() {
            if (!this.adminPostHasPrevious || this.adminPostPage <= 0) {
                return;
            }
            this.adminPostPage -= 1;
            await this.fetchAdminPosts();
        },
        async goToNextAdminPostPage() {
            if (!this.adminPostHasNext) {
                return;
            }
            this.adminPostPage += 1;
            await this.fetchAdminPosts();
        },
        async changeAdminPostSize() {
            this.adminPostPage = 0;
            await this.fetchAdminPosts();
        },
        async searchAdminUsers() {
            this.adminUserPage = 0;
            await this.fetchAdminUsers();
        },
        async clearAdminUserSearch() {
            this.adminUserQuery = "";
            this.adminUserRoleFilter = "";
            this.adminUserActiveFilter = "";
            this.adminUserPage = 0;
            this.adminUserSize = 10;
            await this.fetchAdminUsers();
        },
        async goToPreviousAdminUserPage() {
            if (!this.adminUserHasPrevious || this.adminUserPage <= 0) {
                return;
            }
            this.adminUserPage -= 1;
            await this.fetchAdminUsers();
        },
        async goToNextAdminUserPage() {
            if (!this.adminUserHasNext) {
                return;
            }
            this.adminUserPage += 1;
            await this.fetchAdminUsers();
        },
        async changeAdminUserSize() {
            this.adminUserPage = 0;
            await this.fetchAdminUsers();
        },
        async searchAdminContributorApplications() {
            await this.fetchAdminContributorApplications();
        },
        async clearAdminContributorApplications() {
            this.adminContributorApplicationQuery = "";
            await this.fetchAdminContributorApplications();
        },
        clearMyContributorApplicationFilter() {
            this.myContributorApplicationStatusFilter = "";
        },
        async refreshWorkspaceData() {
            await this.fetchMyProfile();
            await this.fetchMyPosts();
            await this.fetchMyContributorApplications();
            if (this.isAdmin) {
                await this.fetchAdminPosts();
                await this.fetchAdminUsers();
                await this.fetchPendingQueue();
                await this.fetchAdminContributorApplications();
            }
            this.ensureAccessibleProfileSection();
        },
        async refreshAdminViews() {
            if (!this.isAdmin) {
                this.adminPosts = [];
                this.pendingQueuePosts = [];
                return;
            }
            await this.fetchPendingQueue();
            if (this.adminSection === "articles" || this.selectedAdminPostId) {
                await this.fetchAdminPosts();
            }
            if (this.adminSection === "contributor-review") {
                await this.fetchAdminContributorApplications();
            }
        },
        async openPost(postId) {
            const postInCache = this.defaultHomepagePostsCache.find((post) => post.id === postId);
            if (postInCache) {
                postInCache.viewCount = Number(postInCache.viewCount || 0) + 1;
            }

            const postInList = this.posts.find((post) => post.id === postId);
            if (postInList) {
                postInList.viewCount = Number(postInList.viewCount || 0) + 1;
            }

            if (fallbackPostDetails[postId]) {
                fallbackPostDetails[postId].viewCount = Number(fallbackPostDetails[postId].viewCount || 0) + 1;
                this.selectedPost = normaliseDetail(clone(fallbackPostDetails[postId]));
                this.selectedPost.likedByCurrentUser = this.isPostLiked(postId);
                this.selectedPostId = postId;
                this.currentCommentPage = 1;
                this.currentView = "detail";
                if (window.location.hash !== `#detail-${postId}`) {
                    window.location.hash = `#detail-${postId}`;
                }
                return;
            }

            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    headers: this.currentUser ? this.authHeaders() : {}
                });
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "Unable to load this article.");
                }
                this.selectedPost = normaliseDetail(payload.data);
                this.setStoredLike(postId, Boolean(this.selectedPost.likedByCurrentUser));
                this.selectedPostId = postId;
                this.currentCommentPage = 1;
                this.currentView = "detail";
                if (window.location.hash !== `#detail-${postId}`) {
                    window.location.hash = `#detail-${postId}`;
                }
            } catch (error) {
                const summary = this.posts.find((post) => post.id === postId);
                if (summary) {
                    this.selectedPost = normaliseDetail({
                        ...summary,
                        likedByCurrentUser: this.isPostLiked(postId),
                        content: "This article is available in the front-end preview, but the live detail endpoint is not currently returning a full payload.",
                        imageUrls: summary.imageUrls?.length ? summary.imageUrls : (summary.coverImageUrl ? [summary.coverImageUrl] : []),
                        comments: []
                    });
                    this.selectedPostId = postId;
                    this.currentCommentPage = 1;
                    this.currentView = "detail";
                    if (window.location.hash !== `#detail-${postId}`) {
                        window.location.hash = `#detail-${postId}`;
                    }
                } else {
                    this.showError(error.message || "Unable to load this article.");
                }
            } finally {
                this.loading = false;
            }
        },
        async likePost() {
            if (!this.selectedPostId) {
                this.showError("Please open an article before liking.");
                return;
            }
            if (this.likeRequestPending) {
                return;
            }
            if (!this.currentUser) {
                this.redirectGuestToRegister("Sign in before liking articles.");
                return;
            }

            const postId = this.selectedPostId;
            const previousLiked = this.selectedPostLiked;
            const previousLikeCount = Number(this.selectedPost?.likeCount || 0);
            const liked = !previousLiked;
            const optimisticLikeCount = Math.max(0, previousLikeCount + (liked ? 1 : -1));

            this.applyPostLikeState(postId, optimisticLikeCount, liked);
            this.likeRequestPending = true;
            if (fallbackPostDetails[postId]) {
                this.setStoredLike(postId, liked);
                this.showSuccess(liked ? "Article liked successfully." : "Article like removed.");
                this.likeRequestPending = false;
                return;
            }

            try {
                const data = await this.request(`/api/posts/${postId}/like`, {
                    method: "POST"
                }, "", null, true);

                if (data) {
                    this.selectedPost = normaliseDetail(data);
                    const liked = Boolean(this.selectedPost.likedByCurrentUser);
                    this.applyPostLikeState(postId, data.likeCount, liked);
                    this.setStoredLike(postId, liked);
                    this.showSuccess(liked ? "Article liked successfully." : "Article like removed.");
                } else {
                    this.applyPostLikeState(postId, previousLikeCount, previousLiked);
                }
            } finally {
                this.likeRequestPending = false;
            }
        },
        async inspectCategory(categoryName) {
            const resolvedCategoryName = this.resolveCategoryName(categoryName);
            const resolvedCategoryId = this.resolveCategoryId(resolvedCategoryName);
            this.selectedCategoryFocus = resolvedCategoryId;
            this.selectedCategoryFilter = resolvedCategoryName;
            this.resetPostPagination();
            this.navigate("home");
            await this.fetchPosts({
                showGlobalLoading: false,
                useHomepageSearchLoading: true
            });
            this.scrollToCollections();
        },
        async applyCategoryToSearch(categoryName) {
            const resolvedCategoryName = this.resolveCategoryName(categoryName);
            const resolvedCategoryId = this.resolveCategoryId(resolvedCategoryName);
            this.selectedCategoryFocus = resolvedCategoryId;
            this.selectedCategoryFilter = resolvedCategoryName;
            this.resetPostPagination();
            this.navigate("home");
            await this.fetchPosts({
                showGlobalLoading: false,
                useHomepageSearchLoading: true
            });
        },
        focusCollections(shouldNavigate = true) {
            if (shouldNavigate) {
                this.navigate("home");
            }
            this.scrollToCollections();
        },
        scrollToCollections() {
            this.$nextTick(() => {
                const section = this.$refs.homeCollectionsSection;
                if (section?.scrollIntoView) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        },
        focusAuthInput(refName) {
            this.$nextTick(() => {
                const input = this.$refs[refName];
                if (input?.focus) {
                    input.focus();
                }
            });
        },
        openRegisterMode() {
            this.authMode = "register";
            this.errorMessage = "";
            this.focusAuthInput("registerUsernameInput");
        },
        openLoginMode() {
            this.authMode = "login";
            this.errorMessage = "";
            this.focusAuthInput("loginUsernameInput");
        },
        clearHomeSearch() {
            this.homeSearchQuery = "";
            this.selectedCategoryFilter = "";
            this.resetPostPagination();
            this.applyHomepageSearchState("", "");
            this.syncHomepageSearchStateToUrl();
            this.errorMessage = "";
            return this.fetchPosts({
                allowFallback: true,
                showGlobalLoading: false,
                useHomepageSearchLoading: true
            });
        },
        async selectProfileSection(section) {
            if (!this.canAccessContributorWorkspace && ["published", "pending", "drafts"].includes(section)) {
                this.profileSection = "liked";
                return;
            }
            this.profileSection = section;
            if (this.currentUser) {
                await this.fetchMyProfile();
                await this.fetchMyPosts();
                await this.fetchMyContributorApplications();
            }
        },
        async selectAdminSection(section) {
            this.adminSection = section;
            if (section !== "articles") {
                this.pendingQueueReturnToApprovals = false;
                this.closeAdminPostPreview();
            }
            if (this.isAdmin && section === "articles") {
                await this.fetchAdminPosts();
            }
            if (this.isAdmin && section === "users") {
                await this.fetchAdminUsers();
            }
            if (this.isAdmin && section === "contributor-review") {
                await this.fetchAdminContributorApplications();
            }
            if (this.isAdmin && section === "approvals") {
                await this.fetchPendingQueue();
            }
        },
        resolveCategoryId(categoryName) {
            const value = categoryName == null ? "" : String(categoryName);
            const match = this.categories.find((category) => category.name === value || String(category.id) === value)
                || this.categoryStats.find((category) => category.name === value || String(category.id) === value);
            return match ? String(match.id) : "";
        },
        resolveCategoryName(categoryValue) {
            const value = categoryValue == null ? "" : String(categoryValue).trim();
            if (!value) {
                return "";
            }

            const match = this.categories.find((category) => category.name === value || String(category.id) === value)
                || this.categoryStats.find((category) => category.name === value || String(category.id) === value);
            return match?.name || value;
        },
        storeDraftSnapshot(post) {
            if (!post?.id) {
                return;
            }
            this.draftCache[String(post.id)] = post;
            localStorage.setItem(draftCacheKey, JSON.stringify(this.draftCache));
        },
        removeDraftSnapshot(postId) {
            if (!postId) {
                return;
            }
            delete this.draftCache[String(postId)];
            localStorage.setItem(draftCacheKey, JSON.stringify(this.draftCache));
        },
        resetPostEditor() {
            this.postForm = createEmptyPostForm();
            this.editingPostId = null;
            this.editingPostStatus = "";
            this.editingRejectReason = "";
            this.coverFileLabel = "No file selected";
            this.galleryFileLabel = "No files selected";
        },
        applyPostDetailToEditor(postDetail, summaryEntry = null) {
            const fallbackEntry = summaryEntry || {};
            const resolvedCategoryId = postDetail.categoryId
                ? String(postDetail.categoryId)
                : this.resolveCategoryId(postDetail.categoryName || fallbackEntry.categoryName || "");

            this.editingPostId = postDetail.id || fallbackEntry.id || null;
            this.editingPostStatus = postDetail.status || fallbackEntry.status || "";
            this.editingRejectReason = postDetail.rejectReason || fallbackEntry.rejectReason || "";
            this.postForm = {
                title: postDetail.title || fallbackEntry.title || "",
                content: postDetail.content || fallbackEntry.content || "",
                categoryId: resolvedCategoryId,
                coverImageUrl: postDetail.coverImageUrl || fallbackEntry.coverImageUrl || "",
                heritageName: postDetail.heritageName || fallbackEntry.heritageName || "",
                region: postDetail.region || fallbackEntry.region || "",
                imageUrls: Array.isArray(postDetail.imageUrls)
                    ? [...postDetail.imageUrls]
                    : Array.isArray(fallbackEntry.imageUrls)
                        ? [...fallbackEntry.imageUrls]
                        : []
            };
            this.coverFileLabel = this.postForm.coverImageUrl ? this.postForm.coverImageUrl.split("/").pop() : "No file selected";
            this.galleryFileLabel = this.postForm.imageUrls.length
                ? `${this.postForm.imageUrls.length} files selected`
                : "No files selected";
            this.navigate("publish");
        },
        async editPost(entry) {
            const cached = this.draftCache[String(entry.id)] || null;
            const data = await this.request(`/api/my/posts/${entry.id}`, {
                method: "GET"
            }, "", null, true);

            if (data) {
                this.applyPostDetailToEditor(data, entry);
                this.storeDraftSnapshot({
                    ...data,
                    categoryId: data.categoryId || this.resolveCategoryId(data.categoryName || entry.categoryName || ""),
                    rejectReason: entry.rejectReason || ""
                });
                return;
            }

            if (cached) {
                this.showSuccess("Using the latest local draft snapshot because the live draft detail could not be loaded.");
                this.applyPostDetailToEditor(cached, entry);
                return;
            }

            this.showError("This article could not be re-opened because the live draft detail is unavailable and no local draft snapshot was found.");
        },
        async openAdminPost(postId) {
            this.selectedAdminPostId = postId;
            const data = await this.request(`/api/admin/posts/${postId}`, {
                method: "GET"
            }, "", null, true);
            if (data) {
                this.selectedAdminPost = data;
                this.adminReviewReason = data.rejectReason || "";
            }
        },
        async openAdminPostPreview(postId) {
            const data = await this.request(`/api/admin/posts/${postId}`, {
                method: "GET"
            }, "", null, true);
            if (data) {
                this.adminPreviewPostId = postId;
                this.adminPreviewPost = data;
                this.syncBodyScrollLock();
            }
        },
        closeAdminPostPreview() {
            this.closeImagePreview();
            this.adminPreviewPostId = null;
            this.adminPreviewPost = null;
            this.syncBodyScrollLock();
        },
        async submitPermissionRequest() {
            console.log("=== submitPermissionRequest called ===");
            console.log("currentUser:", this.currentUser);
            console.log("applicationReason:", this.contributorApplicationForm.applicationReason);
            console.log("attachment:", this.contributorApplicationForm.attachment);
            
            if (!this.currentUser) {
                console.error("User not logged in!");
                this.showError("Please sign in again before continuing.");
                return;
            }
            
            if (!this.contributorApplicationForm.applicationReason.trim()) {
                this.showError("Application reason cannot be empty.");
                return;
            }

            const formData = new FormData();
            formData.append("request", JSON.stringify({
                applicationReason: this.contributorApplicationForm.applicationReason
            }));
            if (this.contributorApplicationForm.attachment) {
                formData.append("attachment", this.contributorApplicationForm.attachment);
            }

            console.log("Sending request to /api/my/contributor-applications");
            const data = await this.request("/api/my/contributor-applications", {
                method: "POST",
                body: formData
            }, "Contributor application submitted successfully.", null, true);
            console.log("Response data:", data);
            if (data) {
                await this.fetchMyContributorApplications();
                this.profileSection = "permissions";
                this.contributorApplicationForm = {
                    applicationReason: "",
                    attachment: null
                };
                this.attachmentFileLabel = "No file selected";
            }
        },
        handleAttachmentChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type !== "application/pdf") {
                    this.showError("Only PDF attachments are supported.");
                    this.contributorApplicationForm.attachment = null;
                    this.attachmentFileLabel = "No file selected";
                    event.target.value = "";
                    return;
                }
                this.contributorApplicationForm.attachment = file;
                this.attachmentFileLabel = file.name;
            } else {
                this.contributorApplicationForm.attachment = null;
                this.attachmentFileLabel = "No file selected";
            }
        },
        async register() {
            const validationMessage = this.validateRegisterForm();
            if (validationMessage) {
                this.showError(validationMessage);
                return;
            }

            const payload = {
                username: this.registerForm.username.trim(),
                nickname: this.registerForm.nickname.trim(),
                email: this.normaliseOptionalField(this.registerForm.email),
                phone: this.normaliseOptionalField(this.registerForm.phone),
                password: this.registerForm.password
            };

            await this.request("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }, "Registration complete. Please sign in.", async () => {
                this.authBanner = "Registration complete. Please sign in.";
                this.loginForm = {
                    username: payload.username,
                    password: ""
                };
                this.registerForm = {
                    username: "",
                    nickname: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                };
                this.authMode = "login";
                this.navigate("auth");
                this.focusAuthInput("loginUsernameInput");
            });
        },
        async login() {
            const validationMessage = this.validateLoginForm();
            if (validationMessage) {
                this.showError(validationMessage);
                return;
            }

            await this.request("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.loginForm)
            }, "Signed in successfully.", async (data) => {
                this.currentUser = data;
                this.storeUser(data);
                this.syncProfileFormFromCurrentUser();
                this.syncLikedPostsFromStorage();
                this.ensureAccessibleProfileSection();
                this.authBanner = "";
                this.loginForm = { username: "", password: "" };
                await this.refreshWorkspaceData();
                this.navigate("home");
            });
        },
        logout() {
            this.currentUser = null;
            this.selectedPostId = null;
            this.selectedPost = null;
            this.selectedAdminPostId = null;
            this.selectedAdminPost = null;
            this.closeAdminPostPreview();
            this.profileSection = "published";
            this.profileEditingMode = "";
            this.adminSection = "articles";
            this.pendingQueueQuery = "";
            this.pendingQueueReturnToApprovals = false;
            this.myPosts = [];
            this.contributorApplications = [];
            this.adminPosts = [];
            this.adminUsers = [];
            this.adminUserPage = 0;
            this.adminUserSize = 10;
            this.adminUserTotalElements = 0;
            this.adminUserTotalPages = 0;
            this.adminUserHasPrevious = false;
            this.adminUserHasNext = false;
            this.pendingQueuePosts = [];
            this.adminContributorApplications = [];
            this.workspaceDrafts = [];
            this.workspacePending = [];
            this.likedPostIds = [];
            this.authBanner = "";
            this.resetPostEditor();
            localStorage.removeItem("heritage-current-user");
            this.navigate("home");
            this.showSuccess("You have been signed out.");
        },
        async saveProfile() {
            if (!this.currentUser) {
                this.redirectGuestToRegister("Sign in before viewing your profile.");
                return;
            }

            const nickname = String(this.profileForm.nickname || "").trim();
            if (!nickname) {
                this.showError("Display name cannot be empty.");
                return;
            }

            if (this.profileBioByteCount > 500) {
                this.showError("Personal bio cannot exceed 500 bytes.");
                return;
            }

            const data = await this.request("/api/my/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname,
                    avatarUrl: this.normaliseOptionalField(this.profileForm.avatarUrl),
                    bio: this.normaliseOptionalField(this.profileForm.bio)
                })
            }, "Profile updated successfully.", null, true);

            if (data) {
                this.mergeCurrentUserProfile(data);
                this.closeProfileEditor();
            }
        },
        clearProfileAvatar() {
            this.profileForm.avatarUrl = "";
            this.profileAvatarFileLabel = "No file selected";
        },
        async handleProfileAvatarUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                this.profileAvatarFileLabel = "No file selected";
                return;
            }

            this.profileAvatarFileLabel = file.name;
            const result = await this.uploadProfileAvatar(file);
            if (result) {
                this.profileForm.avatarUrl = result.url;
                this.currentUser = {
                    ...this.currentUser,
                    avatarUrl: result.url
                };
                this.storeUser(this.currentUser);
                this.profileEditingMode = "profile";
            }
            event.target.value = "";
        },
        async submitPost() {
            if (!this.currentUser) {
                this.showError("Please sign in before saving a draft.");
                this.navigate("auth");
                return;
            }
            const postValidationError = this.validatePostForm();
            if (postValidationError) {
                this.showError(postValidationError);
                return;
            }

            const payload = {
                ...this.postForm,
                categoryId: Number(this.postForm.categoryId)
            };

            const url = this.editingPostId ? `/api/posts/${this.editingPostId}` : "/api/posts";
            const method = this.editingPostId ? "PUT" : "POST";
            const data = await this.request(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }, this.editingPostId ? "Draft updated successfully." : "Draft saved successfully.", null, true);

            if (data) {
                this.editingPostId = data.id;
                this.editingPostStatus = data.status;
                this.storeDraftSnapshot(data);
                await this.fetchMyPosts();
                this.profileSection = "drafts";
            }
        },
        async submitCurrentPostForReview() {
            if (!this.canSubmitForReview) {
                return;
            }
            const data = await this.request(`/api/posts/${this.editingPostId}/submit-review`, {
                method: "POST"
            }, "Article submitted for review.", null, true);

            if (data) {
                this.removeDraftSnapshot(this.editingPostId);
                this.resetPostEditor();
                await this.fetchMyPosts();
                this.profileSection = "pending";
                this.navigate("profile");
            }
        },
        triggerFilePicker(refName) {
            const input = this.$refs[refName];
            if (input) {
                input.click();
            }
        },
        async submitComment() {
            if (!this.currentUser) {
                this.showError("Please sign in before posting a comment.");
                this.navigate("auth");
                return;
            }
            if (!this.selectedPostId) {
                this.showError("Please open an article before posting a comment.");
                return;
            }

            const data = await this.request(`/api/posts/${this.selectedPostId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: this.commentForm.content
                })
            }, "Comment posted successfully.", null, true);

            if (data) {
                this.commentForm.content = "";
                await this.fetchPosts();
                await this.openPost(this.selectedPostId);
                this.currentCommentPage = 1;
            }
        },
        previousCommentPage() {
            this.currentCommentPage = Math.max(1, this.currentCommentPage - 1);
        },
        nextCommentPage() {
            this.currentCommentPage = Math.min(this.totalCommentPages, this.currentCommentPage + 1);
        },
        async handleCoverUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                this.coverFileLabel = "No file selected";
                return;
            }
            this.coverFileLabel = file.name;
            const result = await this.uploadImage(file);
            if (result) {
                this.postForm.coverImageUrl = result.url;
            }
            event.target.value = "";
        },
        async handleGalleryUpload(event) {
            const files = Array.from(event.target.files || []);
            if (!files.length) {
                this.galleryFileLabel = "No files selected";
                return;
            }
            this.galleryFileLabel = files.length === 1 ? files[0].name : `${files.length} files selected`;
            for (const file of files) {
                const result = await this.uploadImage(file);
                if (result) {
                    this.postForm.imageUrls.push(result.url);
                }
            }
            event.target.value = "";
        },
        async uploadImage(file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("/api/uploads/images", {
                    method: "POST",
                    headers: this.authHeaders(),
                    body: formData
                });
                const payload = await this.readJsonSafely(response);
                if (!payload.success) {
                    throw new Error(this.resolveUploadErrorMessage(payload?.message, "Image upload failed."));
                }
                this.showSuccess(`Image uploaded: ${payload.data.fileName}`);
                return payload.data;
            } catch (error) {
                this.showError(this.resolveUploadErrorMessage(error?.message, "Image upload failed."));
                return null;
            }
        },
        async uploadProfileAvatar(file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("/api/uploads/profile-avatar", {
                    method: "POST",
                    headers: this.authHeaders(),
                    body: formData
                });
                const payload = await this.readJsonSafely(response);
                if (!payload.success) {
                    throw new Error(this.resolveUploadErrorMessage(payload?.message, "Avatar upload failed."));
                }
                this.showSuccess(`Avatar uploaded: ${payload.data.fileName}`);
                return payload.data;
            } catch (error) {
                this.showError(this.resolveUploadErrorMessage(error?.message, "Avatar upload failed."));
                return null;
            }
        },
        async approveSelectedAdminPost() {
            if (!this.selectedAdminPostId) {
                return;
            }
            const reviewedPostId = this.selectedAdminPostId;
            const data = await this.request(`/api/admin/posts/${this.selectedAdminPostId}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "APPROVE", reason: "" })
            }, "Article approved successfully.", null, true);
            if (data) {
                this.adminReviewReason = "";
                await this.refreshAdminViews();
                if (this.pendingQueueReturnToApprovals && data.status !== "PENDING_REVIEW") {
                    this.selectedAdminPostId = reviewedPostId;
                    this.selectedAdminPost = data;
                    this.pendingQueueReturnToApprovals = false;
                    this.adminSection = "approvals";
                } else {
                    await this.openAdminPost(this.selectedAdminPostId);
                }
                await this.fetchPosts();
            }
        },
        async rejectSelectedAdminPost() {
            if (!this.selectedAdminPostId) {
                return;
            }
            const reviewedPostId = this.selectedAdminPostId;
            if (!this.adminReviewReason.trim()) {
                this.showError("Please provide a rejection reason before rejecting this article.");
                return;
            }
            const data = await this.request(`/api/admin/posts/${this.selectedAdminPostId}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "REJECT", reason: this.adminReviewReason })
            }, "Article rejected successfully.", null, true);
            if (data) {
                await this.refreshAdminViews();
                if (this.pendingQueueReturnToApprovals && data.status !== "PENDING_REVIEW") {
                    this.selectedAdminPostId = reviewedPostId;
                    this.selectedAdminPost = data;
                    this.pendingQueueReturnToApprovals = false;
                    this.adminSection = "approvals";
                } else {
                    await this.openAdminPost(this.selectedAdminPostId);
                }
            }
        },
        async quickApproveFromQueue(postId) {
            const data = await this.request(`/api/admin/posts/${postId}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "APPROVE", reason: "" })
            }, "Article approved successfully.", null, true);
            if (data) {
                if (this.selectedAdminPostId === postId) {
                    this.selectedAdminPost = data;
                }
                await this.refreshAdminViews();
                await this.fetchPosts();
            }
        },
        async openReviewFromQueue(postId) {
            this.pendingQueueReturnToApprovals = true;
            await this.selectAdminSection("articles");
            await this.openAdminPost(postId);
        },
        async returnToPendingQueue() {
            this.adminSection = "approvals";
            this.pendingQueueReturnToApprovals = false;
            await this.fetchPendingQueue();
        },
        clearPendingQueueSearch() {
            this.pendingQueueQuery = "";
        },
        async updateAdminUserRole(userId, role) {
            const data = await this.request(`/api/admin/users/${userId}/role`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role })
            }, "User role updated successfully.", null, true);
            if (data) {
                await this.fetchAdminUsers();
            }
        },
        async activateAdminUser(userId) {
            const data = await this.request(`/api/admin/users/${userId}/activate`, {
                method: "POST"
            }, "User account activated successfully.", null, true);
            if (data) {
                await this.fetchAdminUsers();
            }
        },
        async deactivateAdminUser(userId) {
            const data = await this.request(`/api/admin/users/${userId}/deactivate`, {
                method: "POST"
            }, "User account deactivated successfully.", null, true);
            if (data) {
                await this.fetchAdminUsers();
            }
        },
        async approveContributorApplication(applicationId) {
            const data = await this.request(`/api/admin/contributor-applications/${applicationId}/approve`, {
                method: "POST"
            }, "Contributor application approved successfully.", null, true);
            if (data) {
                this.contributorApplicationRejectReasons[applicationId] = "";
                await this.fetchAdminContributorApplications();
                await this.fetchAdminUsers();
            }
        },
        async rejectContributorApplication(applicationId) {
            const reason = (this.contributorApplicationRejectReasons[applicationId] || "").trim();
            if (!reason) {
                this.showError("Please provide a rejection reason before rejecting this application.");
                return;
            }
            const data = await this.request(`/api/admin/contributor-applications/${applicationId}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason })
            }, "Contributor application rejected successfully.", null, true);
            if (data) {
                this.contributorApplicationRejectReasons[applicationId] = "";
                await this.fetchAdminContributorApplications();
                await this.fetchAdminUsers();
            }
        },
        async archiveSelectedAdminPost() {
            if (!this.selectedAdminPostId) {
                return;
            }
            const data = await this.request(`/api/admin/posts/${this.selectedAdminPostId}/archive`, {
                method: "POST"
            }, "Article archived successfully.", null, true);
            if (data) {
                await this.refreshAdminViews();
                await this.openAdminPost(this.selectedAdminPostId);
                await this.fetchPosts();
            }
        },
        async restoreSelectedAdminPost() {
            if (!this.selectedAdminPostId) {
                return;
            }
            const data = await this.request(`/api/admin/posts/${this.selectedAdminPostId}/restore`, {
                method: "POST"
            }, "Article restored successfully.", null, true);
            if (data) {
                await this.refreshAdminViews();
                await this.openAdminPost(this.selectedAdminPostId);
                await this.fetchPosts();
            }
        },
        async request(url, options = {}, successMessage = "", onSuccess, requiresAuth = false) {
            this.errorMessage = "";
            try {
                const headers = requiresAuth ? this.authHeaders(options.headers || {}) : (options.headers || {});
                const response = await fetch(url, {
                    ...options,
                    headers
                });
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "The request could not be completed.");
                }
                if (successMessage) {
                    this.showSuccess(successMessage);
                }
                if (onSuccess) {
                    await onSuccess(payload.data);
                }
                return payload.data;
            } catch (error) {
                this.showError(error.message || "The request could not be completed.");
                return null;
            }
        },
        buildHeatScore(post) {
            const views = Number(post.viewCount || 0);
            const comments = Number(post.commentCount || 0);
            return Math.round((views * 0.8) + (comments * 0.2));
        },
        statusLabel(status) {
            const mapping = {
                PUBLISHED: "Published",
                PENDING: "Pending",
                PENDING_REVIEW: "Pending Review",
                APPROVED: "Approved",
                DRAFT: "Draft",
                REJECTED: "Rejected",
                ARCHIVED: "Archived"
            };
            return mapping[status] || status || "Pending";
        },
        adminSortLabel(sort) {
            const mapping = {
                UPDATED_DESC: "Recently updated",
                SUBMITTED_DESC: "Recently submitted",
                REVIEWED_DESC: "Recently reviewed"
            };
            return mapping[sort] || "Recently updated";
        },
        roleLabel(role) {
            const mapping = {
                USER: "User",
                CONTRIBUTOR: "Contributor",
                ADMIN: "Admin"
            };
            return mapping[role] || role || "User";
        },
        statusClass(status) {
            const label = this.statusLabel(status).toLowerCase().replace(/\s+/g, "-");
            return `status-chip--${label}`;
        },
        adminSortValue(row) {
            if (this.adminSortOption === "SUBMITTED_DESC") {
                return row.submittedAt || row.updatedAt;
            }
            if (this.adminSortOption === "REVIEWED_DESC") {
                return row.reviewedAt || row.updatedAt;
            }
            return row.updatedAt;
        },
        reviewerLabel(post) {
            return post?.reviewerName || post?.reviewedBy || "";
        },
        canManageUserRole(user) {
            return user?.role === "USER" || user?.role === "CONTRIBUTOR";
        },
        nextUserRole(user) {
            return user?.role === "USER" ? "CONTRIBUTOR" : "USER";
        },
        nextUserRoleLabel(user) {
            return user?.role === "USER" ? "Promote to Contributor" : "Change to User";
        },
        nextUserActiveActionLabel(user) {
            return user?.active ? "Deactivate" : "Activate";
        },
        contributorApplicationTitle() {
            return "Contributor Access Application";
        },
        contributorApplicationNote(application) {
            if (application?.status === "PENDING") {
                return "Your contributor application is waiting for administrator review.";
            }
            if (application?.status === "APPROVED") {
                return "Your contributor application was approved.";
            }
            if (application?.status === "REJECTED") {
                return application?.rejectReason
                    ? `Your contributor application was rejected: ${application.rejectReason}`
                    : "Your contributor application was rejected.";
            }
            return "";
        },
        showError(message) {
            this.errorMessage = message;
            this.successMessage = "";
        },
        showSuccess(message) {
            this.successMessage = message;
            this.errorMessage = "";
            window.setTimeout(() => {
                if (this.successMessage === message) {
                    this.successMessage = "";
                }
            }, 2600);
        },
        formatDate(value) {
            if (!value) {
                return "";
            }
            return new Date(value).toLocaleString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        },
        formatShortDate(value) {
            if (!value) {
                return "";
            }
            return new Date(value).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit"
            });
        },
        hasRealCover(url) {
            return Boolean(resolveImageCandidate(url));
        },
        hasPostProvidedCover(post) {
            return Boolean(resolvePostOwnCoverImage(post));
        },
        getPostOwnCoverImage(post) {
            return resolvePostOwnCoverImage(post);
        },
        getPostCoverImage(post) {
            return resolvePostCoverImage(post);
        },
        getDefaultCoverImage(categoryName) {
            return resolveDefaultCoverImage(categoryName);
        },
        coverCategoryLabel(categoryName) {
            return this.translateCategory(categoryName || "Heritage Archive");
        },
        coverSurfaceStyle(postOrCoverImageUrl, categoryName) {
            if (postOrCoverImageUrl && typeof postOrCoverImageUrl === "object") {
                return { backgroundImage: this.buildCover(this.getPostCoverImage(postOrCoverImageUrl)) };
            }
            const coverImage = this.hasRealCover(postOrCoverImageUrl)
                ? postOrCoverImageUrl
                : this.getDefaultCoverImage(categoryName);
            return { backgroundImage: this.buildCover(coverImage) };
        },
        buildCover(url) {
            const asset = this.resolveAsset(url);
            return asset ? `linear-gradient(rgba(43, 28, 19, 0.18), rgba(43, 28, 19, 0.18)), url('${asset}')` : "none";
        },
        resolveAsset(url) {
            return url || "";
        },
        userInitials(value) {
            if (!value) {
                return "HE";
            }
            const parts = String(value).trim().split(/\s+/).slice(0, 2);
            if (parts.length > 1) {
                return parts.map((part) => part.charAt(0).toUpperCase()).join("");
            }
            return value.slice(0, 2).toUpperCase();
        },
        translateCategory(value) {
            if (!value) {
                return "Uncatalogued";
            }
            return categoryMap[value] || value;
        },
        translateNickname(value) {
            if (!value) {
                return "Anonymous Contributor";
            }
            return nicknameMap[value] || value;
        },
        translateText(value) {
            if (!value) {
                return "";
            }
            return textMap[value] || value;
        },
        translateHeritageName(value) {
            if (!value) {
                return "Unnamed heritage item";
            }
            return heritageMap[value] || value;
        },
        translateRegion(value) {
            if (!value) {
                return "Region not specified";
            }
            return regionMap[value] || value;
        },
        translateBackendMessage(message) {
            if (!message) {
                return "";
            }
            return backendMessageMap[message] || message;
        },
        async readJsonSafely(response) {
            try {
                return await response.json();
            } catch (error) {
                return {
                    success: false,
                    message: response.status === 413 || response.status === 400
                        ? "Image exceeds the 10MB size limit."
                        : ""
                };
            }
        },
        resolveUploadErrorMessage(message, fallbackMessage) {
            const translated = this.translateBackendMessage(message);
            if (translated) {
                return translated;
            }
            if (typeof message === "string" && message.toLowerCase().includes("10mb")) {
                return "Image exceeds the 10MB size limit.";
            }
            return fallbackMessage;
        },
        normaliseOptionalField(value) {
            const trimmed = String(value || "").trim();
            return trimmed ? trimmed : null;
        },
        countBytes(value) {
            return new TextEncoder().encode(String(value || "")).length;
        },
        truncateToByteLimit(value, byteLimit) {
            const encoder = new TextEncoder();
            let totalBytes = 0;
            let result = "";

            for (const character of String(value || "")) {
                const characterBytes = encoder.encode(character).length;
                if (totalBytes + characterBytes > byteLimit) {
                    break;
                }
                result += character;
                totalBytes += characterBytes;
            }

            return result;
        },
        limitPostField(fieldName, byteLimit, event) {
            const rawValue = event?.target?.value ?? this.postForm[fieldName];
            const limitedValue = this.truncateToByteLimit(rawValue, byteLimit);
            this.postForm[fieldName] = limitedValue;

            if (event?.target && event.target.value !== limitedValue) {
                event.target.value = limitedValue;
            }
        },
        validatePostForm() {
            const title = String(this.postForm.title || "").trim();
            const content = String(this.postForm.content || "");

            if (!title) {
                return "A title is required.";
            }
            if (this.countBytes(title) > postTitleByteLimit) {
                return `Title cannot exceed ${postTitleByteLimit} UTF-8 bytes.`;
            }
            if (!content.trim()) {
                return "Story text cannot be empty.";
            }
            if (this.countBytes(content) > postContentByteLimit) {
                return `Story text cannot exceed ${postContentByteLimit} UTF-8 bytes.`;
            }
            return "";
        },
        validateRegisterForm() {
            const username = this.registerForm.username.trim();
            const nickname = this.registerForm.nickname.trim();
            const email = String(this.registerForm.email || "").trim();
            const phone = String(this.registerForm.phone || "").trim();
            const password = this.registerForm.password || "";
            const confirmPassword = this.registerForm.confirmPassword || "";

            if (!username) {
                return "Username cannot be empty.";
            }
            if (username.length < 4 || username.length > 50) {
                return "Username must be between 4 and 50 characters.";
            }
            if (!nickname) {
                return "Display name cannot be empty.";
            }
            if (nickname.length > 50) {
                return "Display name cannot exceed 50 characters.";
            }
            if (!password) {
                return "Password cannot be empty.";
            }
            if (password.length < 6) {
                return "Password must be at least 6 characters.";
            }
            if (password !== confirmPassword) {
                return "Passwords do not match.";
            }
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return "Please enter a valid email address.";
            }
            if (phone && phone.length > 20) {
                return "Phone number cannot exceed 20 characters.";
            }
            return "";
        },
        validateLoginForm() {
            const username = this.loginForm.username.trim();
            const password = this.loginForm.password || "";

            if (!username || !password) {
                return "Please enter your username and password.";
            }
            return "";
        },
        storeUser(user) {
            localStorage.setItem("heritage-current-user", JSON.stringify(user));
        },
        renderCharts() {
            this.renderPostLineChart();
            this.renderCommentLineChart();
            this.renderCategoryPieChart();
        },
        renderPostLineChart() {
            const chartDom = document.getElementById("chart-posts");
            if (!chartDom || typeof echarts === "undefined") {
                return;
            }
            const myChart = echarts.init(chartDom);
            const dateCounts = {};
            this.defaultHomepagePostsCache.forEach((post) => {
                const date = String(post.createdAt || "").substring(0, 10);
                if (date) {
                    dateCounts[date] = (dateCounts[date] || 0) + 1;
                }
            });
            const sortedDates = Object.keys(dateCounts).sort();
            const data = sortedDates.map((date) => dateCounts[date]);

            myChart.setOption({
                title: { text: "Daily Published Stories", left: "center", textStyle: { fontSize: 14, fontFamily: "Cormorant Garamond" } },
                tooltip: { trigger: "axis" },
                grid: { top: 54, right: 22, bottom: 36, left: 42 },
                xAxis: { type: "category", data: sortedDates },
                yAxis: { type: "value", minInterval: 1 },
                series: [{ data, type: "line", smooth: true, itemStyle: { color: "#8f4b2f" } }]
            });
        },
        renderCommentLineChart() {
            const chartDom = document.getElementById("chart-comments");
            if (!chartDom || typeof echarts === "undefined") {
                return;
            }
            const myChart = echarts.init(chartDom);
            const dateCounts = {};
            this.defaultHomepagePostsCache.forEach((post) => {
                const date = String(post.createdAt || "").substring(0, 10);
                if (date) {
                    dateCounts[date] = (dateCounts[date] || 0) + Number(post.commentCount || 0);
                }
            });
            const sortedDates = Object.keys(dateCounts).sort();
            const data = sortedDates.map((date) => dateCounts[date]);

            myChart.setOption({
                title: { text: "Discussion Activity Trends", left: "center", textStyle: { fontSize: 14, fontFamily: "Cormorant Garamond" } },
                tooltip: { trigger: "axis" },
                grid: { top: 54, right: 22, bottom: 36, left: 42 },
                xAxis: { type: "category", data: sortedDates },
                yAxis: { type: "value", minInterval: 1 },
                series: [{ data, type: "line", smooth: true, itemStyle: { color: "#6d7561" } }]
            });
        },
        renderCategoryPieChart() {
            const chartDom = document.getElementById("chart-categories");
            if (!chartDom || typeof echarts === "undefined") {
                return;
            }
            const myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
            myChart.off("click");
            myChart.off("legendselectchanged");

            const pieData = this.categoryPieLegendItems.map((item) => ({
                name: item.name,
                value: item.count
            }));

            myChart.setOption({
                color: categoryPieColors,
                title: { text: "Collections Distribution", textStyle: { fontSize: 14, fontFamily: "Cormorant Garamond" }, left: "center" },
                tooltip: { trigger: "item" },
                legend: {
                    show: false,
                    selectedMode: false
                },
                series: [{
                    type: "pie",
                    selectedMode: false,
                    radius: ["34%", "64%"],
                    center: ["50%", "55%"],
                    label: { show: false },
                    labelLine: { show: false },
                    emphasis: { focus: "none", scale: true },
                    itemStyle: { borderRadius: 5, borderColor: "#fff", borderWidth: 2 },
                    data: pieData
                }]
            }, true);
        }
    }
}).mount("#app");
