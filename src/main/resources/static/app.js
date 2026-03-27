const { createApp } = Vue;
const readStoredUser = () => {
    const raw = localStorage.getItem("heritage-current-user");
    return raw ? JSON.parse(raw) : null;
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
            commentForm: {
                content: ""
            }
        };
    },
    computed: {
        filteredPosts() {
            if (!this.selectedCategoryFilter) {
                return this.posts;
            }
            return this.posts.filter((post) => post.categoryName === this.selectedCategoryFilter);
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
        navigate(view) {
            if (view === "detail" && this.selectedPostId) {
                window.location.hash = `#detail-${this.selectedPostId}`;
                return;
            }
            window.location.hash = `#${view}`;
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
            this.currentView = hash;
        },
        async fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                const payload = await response.json();
                this.categories = payload.data || [];
            } catch (error) {
                this.showError("分类加载失败");
            }
        },
        async fetchPosts() {
            this.loading = true;
            try {
                const response = await fetch("/api/posts");
                const payload = await response.json();
                this.posts = payload.data || [];
            } catch (error) {
                this.showError("文章列表加载失败");
            } finally {
                this.loading = false;
            }
        },
        async openPost(postId) {
            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await fetch(`/api/posts/${postId}`);
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(payload.message || "文章详情加载失败");
                }
                this.selectedPost = payload.data;
                this.selectedPostId = postId;
                this.currentView = "detail";
                if (window.location.hash !== `#detail-${postId}`) {
                    window.location.hash = `#detail-${postId}`;
                }
            } catch (error) {
                this.showError(error.message || "文章详情加载失败");
            } finally {
                this.loading = false;
            }
        },
        async register() {
            await this.request("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.registerForm)
            }, "注册成功，已自动登录", (data) => {
                this.currentUser = data;
                this.storeUser(data);
                this.registerForm = { username: "", nickname: "", password: "" };
                this.currentView = "publish";
                window.location.hash = "#publish";
            });
        },
        async login() {
            await this.request("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.loginForm)
            }, "登录成功", (data) => {
                this.currentUser = data;
                this.storeUser(data);
                this.loginForm = { username: "", password: "" };
                this.currentView = "home";
                window.location.hash = "#home";
            });
        },
        logout() {
            this.currentUser = null;
            this.selectedPostId = null;
            this.selectedPost = null;
            localStorage.removeItem("heritage-current-user");
            this.showSuccess("已退出登录");
        },
        async submitPost() {
            if (!this.currentUser) {
                this.showError("请先注册或登录后再发布");
                this.currentView = "auth";
                window.location.hash = "#auth";
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
            }, "文章发布成功", async (data) => {
                this.postForm = {
                    title: "",
                    content: "",
                    categoryId: "",
                    coverImageUrl: "",
                    heritageName: "",
                    region: "",
                    imageUrls: []
                };
                await this.fetchPosts();
                await this.openPost(data.id);
            });
        },
        async submitComment() {
            if (!this.currentUser) {
                this.showError("请先登录后再评论");
                this.currentView = "auth";
                window.location.hash = "#auth";
                return;
            }
            if (!this.selectedPostId) {
                this.showError("请先选择文章");
                return;
            }

            await this.request(`/api/posts/${this.selectedPostId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: this.currentUser.id,
                    content: this.commentForm.content
                })
            }, "评论发布成功", async () => {
                this.commentForm.content = "";
                await this.fetchPosts();
                await this.openPost(this.selectedPostId);
            });
        },
        async handleCoverUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            const result = await this.uploadImage(file);
            if (result) {
                this.postForm.coverImageUrl = result.url;
            }
            event.target.value = "";
        },
        async handleGalleryUpload(event) {
            const files = Array.from(event.target.files || []);
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
                    throw new Error(payload.message || "图片上传失败");
                }
                this.showSuccess(`图片上传成功：${payload.data.fileName}`);
                return payload.data;
            } catch (error) {
                this.showError(error.message || "图片上传失败");
                return null;
            }
        },
        async request(url, options, successMessage, onSuccess) {
            this.errorMessage = "";
            try {
                const response = await fetch(url, options);
                const payload = await response.json();
                if (!payload.success) {
                    throw new Error(payload.message || "请求失败");
                }
                this.showSuccess(successMessage);
                if (onSuccess) {
                    await onSuccess(payload.data);
                }
            } catch (error) {
                this.showError(error.message || "请求失败");
            }
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
            }, 2500);
        },
        formatDate(value) {
            if (!value) {
                return "";
            }
            return new Date(value).toLocaleString("zh-CN");
        },
        buildCover(url) {
            const asset = this.resolveAsset(url);
            return asset ? `linear-gradient(rgba(48, 28, 15, 0.2), rgba(48, 28, 15, 0.2)), url('${asset}')` : "none";
        },
        resolveAsset(url) {
            if (!url) {
                return "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80";
            }
            return url;
        },
        storeUser(user) {
            localStorage.setItem("heritage-current-user", JSON.stringify(user));
        },
        readStoredUser() {
            return readStoredUser();
        }
    }
}).mount("#app");
