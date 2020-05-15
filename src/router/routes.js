import multiguard from "vue-router-multiguard";
import store from "./../store";

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
    let isLoggedIn = store().getters["Auth/isLoggedIn"];
    if (isLoggedIn) {
        next();
    } else {
        next("/login");
    }
};

const routes = [{
        path: "/",
        beforeEnter: multiguard([auth]),
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                component: () =>
                    import ("pages/HomePage.vue")
            },
            {
                path: "/post",
                component: () =>
                    import ("pages/PostPage.vue")
            },
            {
                path: "/post/create",
                component: () =>
                    import ("pages/post/CreatePage.vue")
            },
            {
                path: "/post/like/:postId",
                name: "postlike",
                component: () =>
                    import ("pages/post/LikePage.vue"),
                props: true
            },
            {
                path: "/post/comment/:postId",
                name: "postcomment",
                component: () =>
                    import ("pages/post/CommentPage.vue"),
                props: true
            },
            {
                path: "/post/comment/like/:commentId",
                name: "postcommentlike",
                component: () =>
                    import ("pages/post/comment/LikePage.vue"),
                props: true
            },
            {
                path: "/account",
                component: () =>
                    import ("pages/AccountPage.vue")
            },
            {
                path: "/quiz/:assigmentId",
                component: () =>
                    import ("pages/QuizPage.vue"),
                props: true
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("layouts/LoginLayout.vue")
    }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
    routes.push({
        path: "*",
        component: () =>
            import ("pages/Error404.vue")
    });
}

export default routes;