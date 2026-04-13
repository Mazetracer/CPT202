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

const backendMessageMap = {
    "用户名已存在": "This username is already in use.",
    "用户不存在": "The user could not be found.",
    "账号已被禁用": "This account has been disabled.",
    "用户名或密码错误": "The username or password is incorrect.",
    "文章不存在": "The article could not be found.",
    "分类不存在": "The collection could not be found.",
    "分类名称已存在": "This collection name already exists.",
    "评论用户不能为空": "A valid comment author is required.",
    "评论内容不能为空": "Comment content cannot be empty.",
    "作者不能为空": "An author is required.",
    "分类不能为空": "Please choose a collection.",
    "标题不能为空": "A title is required.",
    "正文不能为空": "Story text cannot be empty.",
    "用户名不能为空": "Username cannot be empty.",
    "密码不能为空": "Password cannot be empty.",
    "昵称不能为空": "Display name cannot be empty."
};

const categoryDescriptionMap = {
    "传统技艺": "Material culture, workshop practice, motifs, and making processes.",
    "传统戏曲": "Performance traditions, costume, vocal lineages, and stage memory.",
    "古建筑": "Historic buildings, construction craft, spatial heritage, and preservation.",
    "民俗节庆": "Seasonal ritual, festivals, community gatherings, and oral custom."
};

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

const adminUserTemplates = [
    {
        id: 1,
        username: "admin",
        nickname: "平台管理员",
        role: "ADMIN",
        status: "Active",
        contributions: 12
    },
    {
        id: 2,
        username: "member01",
        nickname: "小组成员1",
        role: "USER",
        status: "Active",
        contributions: 5
    },
    {
        id: 3,
        username: "heritage_guest",
        nickname: "Archive Visitor",
        role: "USER",
        status: "Pending Verification",
        contributions: 1
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

const normaliseSummary = (post, index = 0) => ({
    id: post.id ?? 1000 + index,
    title: post.title || "Untitled heritage article",
    coverImageUrl: post.coverImageUrl || "",
    heritageName: post.heritageName || "",
    region: post.region || "",
    status: post.status || "PUBLISHED",
    authorName: post.authorName || post.authorNickname || "Anonymous Contributor",
    categoryName: post.categoryName || "传统技艺",
    likeCount: Number(post.likeCount || 0),
    favoriteCount: Number(post.favoriteCount || 0),
    commentCount: Number(post.commentCount || 0),
    createdAt: post.createdAt || "2026-04-01T10:00:00"
});

const normaliseDetail = (detail, index = 0) => ({
    ...normaliseSummary(detail, index),
    content: detail.content || "This front-end preview card does not have a full article body yet.",
    imageUrls: Array.isArray(detail.imageUrls) ? detail.imageUrls : [],
    comments: Array.isArray(detail.comments) ? detail.comments : []
});

const buildFallbackSummaries = () =>
    Object.values(fallbackPostDetails).map((detail, index) => normaliseSummary(detail, index));

const mergeCategoriesWithFallback = (items = []) => {
    const seen = new Set();
    const merged = [];

    [...items, ...fallbackCategories].forEach((category, index) => {
        const name = category?.name;
        if (!name || seen.has(name)) {
            return;
        }

        seen.add(name);
        merged.push({
            id: category.id ?? 500 + index,
            name,
            description: category.description || categoryDescriptionMap[name] || "",
            createdAt: category.createdAt || "2026-04-01T10:00:00"
        });
    });

    return merged;
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
            selectedPostId: null,
            selectedPost: null,
            selectedCategoryFilter: "",
            selectedCategoryFocus: "",
            homeSearchQuery: "",
            profileSection: "published",
            adminSection: "articles",
            currentUser: readStoredUser(),
            registerForm: {
                username: "",
                nickname: "",
                password: ""
            },
            loginForm: {
                username: "",
                password: ""
            },
            postForm: {
                title: "",
                content: "",
                categoryId: "",
                coverImageUrl: "",
                heritageName: "",
                region: "",
                imageUrls: []
            },
            coverFileLabel: "No file selected",
            galleryFileLabel: "No files selected",
            commentForm: {
                content: ""
            },
            workspaceDrafts: clone(workspaceDraftTemplates),
            workspacePending: clone(workspacePendingTemplates),
            permissionRequests: clone(permissionRequestTemplates),
            adminUsers: clone(adminUserTemplates),
            adminApprovals: clone(adminApprovalTemplates)
        };
    },
    computed: {
        isAdmin() {
            return this.currentUser?.role === "ADMIN";
        },
        currentViewLabel() {
            const labels = {
                home: "Homepage dashboard",
                detail: "Reading an article",
                publish: "Preparing a contribution",
                profile: "Personal workspace",
                admin: "Administration preview",
                auth: "Managing account access"
            };
            return labels[this.currentView] || "Homepage dashboard";
        },
        totalStories() {
            return this.posts.length;
        },
        totalComments() {
            return this.posts.reduce((sum, post) => sum + Number(post.commentCount || 0), 0);
        },
        totalContributors() {
            return new Set(this.posts.map((post) => post.authorName).filter(Boolean)).size;
        },
        filteredPosts() {
            const query = this.homeSearchQuery.trim().toLowerCase();
            return this.posts.filter((post) => {
                const matchesCategory = !this.selectedCategoryFilter || post.categoryName === this.selectedCategoryFilter;
                const matchesSearch = !query || this.matchesSearch(post, query);
                return matchesCategory && matchesSearch;
            });
        },
        featuredPost() {
            return this.filteredPosts[0] || this.hotPosts[0] || this.posts[0] || null;
        },
        hotPosts() {
            return [...this.posts]
                .sort((left, right) => this.buildHeatScore(right) - this.buildHeatScore(left))
                .slice(0, 5);
        },
        categoryStats() {
            const categories = this.categories.length ? this.categories : mergeCategoriesWithFallback([]);
            const counts = categories.map((category) => {
                const posts = this.posts.filter((post) => post.categoryName === category.name);
                return {
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
        focusedCategory() {
            return this.selectedCategoryFocus || this.categoryStats[0]?.name || "";
        },
        focusedCategoryPosts() {
            if (!this.focusedCategory) {
                return [];
            }
            return this.posts.filter((post) => post.categoryName === this.focusedCategory);
        },
        profilePublishedPosts() {
            if (!this.currentUser) {
                return [];
            }

            const authored = this.posts.filter((post) => post.authorName === this.currentUser.nickname);
            if (authored.length) {
                return authored;
            }

            return [
                {
                    id: "published-demo-1",
                    title: "Workspace Preview: Notes on Ancestral Hall Plaques",
                    categoryName: "古建筑",
                    heritageName: "Inscribed Wooden Plaques",
                    region: "Quanzhou, Fujian",
                    authorName: this.currentUser.nickname,
                    commentCount: 3,
                    createdAt: "2026-04-06T11:20:00"
                },
                {
                    id: "published-demo-2",
                    title: "Workspace Preview: Dye Vat Observation Record",
                    categoryName: "传统技艺",
                    heritageName: "Workshop Material Study",
                    region: "Qiandongnan, Guizhou",
                    authorName: this.currentUser.nickname,
                    commentCount: 1,
                    createdAt: "2026-04-04T17:45:00"
                }
            ];
        },
        profileSummary() {
            return {
                published: this.profilePublishedPosts.length,
                pending: this.workspacePending.length,
                drafts: this.workspaceDrafts.length,
                requests: this.permissionRequests.length
            };
        },
        adminArticles() {
            const liveRows = this.posts.slice(0, 6).map((post, index) => ({
                id: `live-${post.id}`,
                title: post.title,
                categoryName: post.categoryName,
                authorName: post.authorName,
                status: index % 5 === 0 ? "Pending Review" : index % 4 === 0 ? "Draft" : "Published",
                updatedAt: post.createdAt
            }));

            const seededRows = [
                {
                    id: "seed-1",
                    title: "Review Queue: Bronze Mirror Motif Catalog",
                    categoryName: "古建筑",
                    authorName: "Archive Visitor",
                    status: "Pending Review",
                    updatedAt: "2026-04-11T09:30:00"
                },
                {
                    id: "seed-2",
                    title: "Draft Queue: Shrine Textile Condition Survey",
                    categoryName: "传统技艺",
                    authorName: "Team Member 1",
                    status: "Draft",
                    updatedAt: "2026-04-10T18:20:00"
                }
            ];

            return [...liveRows, ...seededRows].slice(0, 8);
        },
        adminUsersView() {
            const rows = [...this.adminUsers];
            if (this.currentUser) {
                const exists = rows.some((user) => user.username === this.currentUser.username);
                if (!exists) {
                    rows.unshift({
                        id: `current-${this.currentUser.id}`,
                        username: this.currentUser.username,
                        nickname: this.currentUser.nickname,
                        role: this.currentUser.role || "USER",
                        status: "Active",
                        contributions: this.profilePublishedPosts.length
                    });
                }
            }
            return rows;
        },
        adminApprovalsView() {
            const permissionRows = this.permissionRequests.map((request) => ({
                id: `request-${request.id}`,
                title: request.title,
                applicant: this.currentUser ? this.translateNickname(this.currentUser.nickname) : "Contributor",
                type: "Permission request",
                status: this.statusLabel(request.status),
                submittedAt: request.createdAt
            }));

            return [...permissionRows, ...this.adminApprovals];
        }
    },
    async mounted() {
        await Promise.all([this.fetchCategories(), this.fetchPosts()]);
        this.handleHash();
        window.addEventListener("hashchange", this.handleHash);
    },
    beforeUnmount() {
        window.removeEventListener("hashchange", this.handleHash);
    },
    methods: {
        navigate(view, updateHash = true) {
            let nextView = view;

            if (view === "profile" && !this.currentUser) {
                this.showError("Please sign in to open your personal workspace.");
                nextView = "auth";
            }

            if (view === "admin" && !this.isAdmin) {
                this.showError("Sign in with the administrator account to open the admin preview.");
                nextView = this.currentUser ? "profile" : "auth";
            }

            this.currentView = nextView;
            if (updateHash) {
                window.location.hash = `#${nextView}`;
            }
        },
        handleHash() {
            const hash = window.location.hash.replace("#", "");
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
        async fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                const payload = await response.json();
                this.categories = mergeCategoriesWithFallback(payload.data || []);
            } catch (error) {
                this.categories = mergeCategoriesWithFallback([]);
            } finally {
                if (!this.selectedCategoryFocus && this.categories.length) {
                    this.selectedCategoryFocus = this.categories[0].name;
                }
            }
        },
        async fetchPosts() {
            this.loading = true;
            try {
                const response = await fetch("/api/posts");
                const payload = await response.json();
                this.posts = mergePostsWithFallback(payload.data || []);
            } catch (error) {
                this.posts = mergePostsWithFallback([]);
                this.showError("The live feed is unavailable, so the front-end demo content is being shown instead.");
            } finally {
                this.loading = false;
            }
        },
        async openPost(postId) {
            if (fallbackPostDetails[postId]) {
                this.selectedPost = normaliseDetail(clone(fallbackPostDetails[postId]));
                this.selectedPostId = postId;
                this.currentView = "detail";
                if (window.location.hash !== `#detail-${postId}`) {
                    window.location.hash = `#detail-${postId}`;
                }
                return;
            }

            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/posts/${postId}`);
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "Unable to load this article.");
                }
                this.selectedPost = normaliseDetail(payload.data);
                this.selectedPostId = postId;
                this.currentView = "detail";
                if (window.location.hash !== `#detail-${postId}`) {
                    window.location.hash = `#detail-${postId}`;
                }
            } catch (error) {
                const summary = this.posts.find((post) => post.id === postId);
                if (summary) {
                    this.selectedPost = normaliseDetail({
                        ...summary,
                        content: "This article is available in the front-end preview, but the live detail endpoint is not currently returning a full payload.",
                        imageUrls: summary.coverImageUrl ? [summary.coverImageUrl] : [],
                        comments: []
                    });
                    this.selectedPostId = postId;
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
        inspectCategory(categoryName) {
            this.selectedCategoryFocus = categoryName;
            this.selectedCategoryFilter = categoryName;
            this.navigate("home");
            this.scrollToCollections();
        },
        applyCategoryToSearch(categoryName) {
            this.selectedCategoryFilter = categoryName;
            this.navigate("home");
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
        clearHomeSearch() {
            this.homeSearchQuery = "";
            this.selectedCategoryFilter = "";
        },
        selectProfileSection(section) {
            this.profileSection = section;
        },
        selectAdminSection(section) {
            this.adminSection = section;
        },
        submitPermissionRequest(title) {
            const record = {
                id: `request-${Date.now()}`,
                title,
                status: "PENDING",
                createdAt: new Date().toISOString(),
                note: "Front-end preview request submitted. Backend workflow can be connected later."
            };
            this.permissionRequests.unshift(record);
            this.profileSection = "permissions";
            this.showSuccess("Permission request added to the front-end preview queue.");
        },
        async register() {
            await this.request("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.registerForm)
            }, "Registration complete. You are now signed in.", (data) => {
                this.currentUser = data;
                this.storeUser(data);
                this.registerForm = { username: "", nickname: "", password: "" };
                this.navigate("profile");
            });
        },
        async login() {
            await this.request("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.loginForm)
            }, "Signed in successfully.", (data) => {
                this.currentUser = data;
                this.storeUser(data);
                this.loginForm = { username: "", password: "" };
                this.navigate("home");
            });
        },
        logout() {
            this.currentUser = null;
            this.selectedPostId = null;
            this.selectedPost = null;
            this.profileSection = "published";
            this.adminSection = "articles";
            localStorage.removeItem("heritage-current-user");
            this.navigate("home");
            this.showSuccess("You have been signed out.");
        },
        async submitPost() {
            if (!this.currentUser) {
                this.showError("Please sign in before publishing an article.");
                this.navigate("auth");
                return;
            }

            const payload = {
                ...this.postForm,
                authorId: this.currentUser.id,
                categoryId: Number(this.postForm.categoryId)
            };

            await this.request("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }, "Article published successfully.", async (data) => {
                this.postForm = {
                    title: "",
                    content: "",
                    categoryId: "",
                    coverImageUrl: "",
                    heritageName: "",
                    region: "",
                    imageUrls: []
                };
                this.coverFileLabel = "No file selected";
                this.galleryFileLabel = "No files selected";
                await this.fetchPosts();
                if (data?.id) {
                    await this.openPost(data.id);
                }
            });
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

            await this.request(`/api/posts/${this.selectedPostId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: this.currentUser.id,
                    content: this.commentForm.content
                })
            }, "Comment posted successfully.", async () => {
                this.commentForm.content = "";
                await this.fetchPosts();
                await this.openPost(this.selectedPostId);
            });
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
                    body: formData
                });
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "Image upload failed.");
                }
                this.showSuccess(`Image uploaded: ${payload.data.fileName}`);
                return payload.data;
            } catch (error) {
                this.showError(error.message || "Image upload failed.");
                return null;
            }
        },
        async request(url, options, successMessage, onSuccess) {
            this.errorMessage = "";
            try {
                const response = await fetch(url, options);
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(this.translateBackendMessage(payload.message) || "The request could not be completed.");
                }
                this.showSuccess(successMessage);
                if (onSuccess) {
                    await onSuccess(payload.data);
                }
            } catch (error) {
                this.showError(error.message || "The request could not be completed.");
            }
        },
        matchesSearch(post, query) {
            const fields = [
                post.title,
                this.translateText(post.title),
                post.heritageName,
                this.translateHeritageName(post.heritageName),
                post.region,
                this.translateRegion(post.region),
                post.authorName,
                this.translateNickname(post.authorName),
                post.categoryName,
                this.translateCategory(post.categoryName)
            ];

            return fields
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(query);
        },
        buildHeatScore(post) {
            return Number(post.likeCount || 0) * 3 + Number(post.favoriteCount || 0) * 2 + Number(post.commentCount || 0) * 4;
        },
        statusLabel(status) {
            const mapping = {
                PUBLISHED: "Published",
                PENDING: "Pending",
                PENDING_REVIEW: "Pending Review",
                APPROVED: "Approved",
                DRAFT: "Draft",
                REJECTED: "Rejected"
            };
            return mapping[status] || status || "Pending";
        },
        statusClass(status) {
            const label = this.statusLabel(status).toLowerCase().replace(/\s+/g, "-");
            return `status-chip--${label}`;
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
        buildCover(url) {
            const asset = this.resolveAsset(url);
            return asset ? `linear-gradient(rgba(43, 28, 19, 0.18), rgba(43, 28, 19, 0.18)), url('${asset}')` : "none";
        },
        resolveAsset(url) {
            if (!url) {
                return "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80";
            }
            return url;
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
        storeUser(user) {
            localStorage.setItem("heritage-current-user", JSON.stringify(user));
        }
    }
}).mount("#app");
