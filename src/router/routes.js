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
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                component: () =>
                    import ("pages/HomePage.vue")
            },
            {
                path: "/post",
                beforeEnter: multiguard([auth]),
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
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/AccountPage.vue")
            },
            {
                // path: "/quiz/:assigmentId/:userId",
                path: "/quiz",
                name: "quizpage",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/QuizPage.vue"),
                props: true
            },
            ,
            {
                path: "/trainingquizpage",
                name: "trainingquizpage",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/TrainingQuizPage.vue"),
                props: true
            },
            {
                // path: "/quiz/:assigmentId/:userId",
                path: "/traininglist",
                name: "traininglist",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/TrainingListPage.vue"),
                props: true
            },
            {
                path: "/task/:assigmentId",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/IndividualTaskPage.vue"),
                props: true
            },
            {
            path: "/register",
                component: () =>
                    import ("layouts/RegisterLayout.vue")
            },
            {
            path: "/account/edit",
                component: () =>
                    import ("pages/account/EditPage.vue")
            },
            {
            path: "/account/changeavatar",
                beforeEnter: multiguard([auth]),
                name: "accountchangeavatar",
                component: () =>
                    import ("pages/account/ChangeAvatarPage.vue"),
                props: true
            },
            {
            path: "/history",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/HistoryPage.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("layouts/LoginLayout.vue")
    },
    {
        path: '/result',
        name: 'result',
        component: ()=> import('pages/quiz/ResultPage.vue'),
        props: true
    },
    {
        path: '/trainingresult',
        name: 'trainingresult',
        component: ()=> import('pages/quiz/TrainingResultPage.vue'),
        props: true
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