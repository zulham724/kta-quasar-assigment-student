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
        //beforeEnter: multiguard([auth]),
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
                name: "create",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/post/CreatePage.vue"),
                props: true
            },
            {
                path: "/post/like/:postId",
                name: "postlike",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/post/LikePage.vue"),
                props: true
            },
            {
                path: "/post/comment/:postId",
                beforeEnter: multiguard([auth]),
                //path: "/post/comment",
                name: "postcomment",
                component: () =>
                    import ("pages/post/CommentPage.vue"),
                props: true,
                
            },
            {
                path: "/post/comment/like/:commentId",
                beforeEnter: multiguard([auth]),
                name: "postcommentlike",
                component: () =>
                    import ("pages/post/comment/LikePage.vue"),
                props: true
            },
            {
                path: "/announcement",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/AnnouncementPage.vue")
            },
            {
                path: "/ranking",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/RankingPage.vue")
            },
            {
                path: "/statistic",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/StatisticPage.vue")
            },
            {
                path: "/dailytask",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/DailyTaskPage.vue")
            },
            {
                path: "/account",
                name: 'account',
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/AccountPage.vue")
                
            },
            {
                path: "/setting",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/Account/SettingsAccountPage.vue")
            },
            {
                path: "/theory",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/TheoryPage.vue")
            },
            {
                path: "/theory/modul",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/theory/ModulListPage.vue")
            },
            {
                path: "/theory/modul/save",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/theory/save/ModulItemSavePage.vue")
            },
            {
                path: "/theory/modul/comment",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/theory/comment/ModulItemCommentPage.vue")
            },
            {
                path: "/modul",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/ModulPage.vue")
            },
            {
                path: "/theory/media",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/theory/MediaListPage.vue")
            },
            {
                path: "/theory/media/save",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/theory/save/MediaItemSavePage.vue")
            },
            {
                path: "/theory/media/comment/:postId",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/post/CommentMediaPage.vue"),
                props:true
            },
            {
                path: "/mediapost/like/:postId",
                name: "mediapostlike",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/post/LikeMediaPage.vue"),
                props: true
            },
            {
                path: "/assigment",
                name: "assigment",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/AssigmentListPage.vue")
            },
            {
                // path: "/quiz/:assigmentId/:userId",
                path: "/quiz",
                name: "quizpage",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/quizzPage.vue"),
                props: true
            },
            {
                // path: "/quiz/:assigmentId/:userId",
                path: "/trainingquiz",
                name: "trainingquizpage",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/TrainingQuizzPage.vue"),
                props: true
            },
            {
                path: "/review",
                name: 'review',
                props:true,
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/quiz/QuizReviewPage.vue")
            },
            // {
            //     path: "/trainingquizpage",
            //     name: "trainingquizpage",
            //     beforeEnter: multiguard([auth]),
            //     component: () =>
            //         import ("pages/TrainingQuizPage.vue"),
            //     props: true
            // },
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
        path: "/register",
        name:'register',
        component: () =>import ("layouts/RegisterLayout.vue")
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
    },
    // {
    //     path: '/trainingresult',
    //     name: 'trainingresult',
    //     component: ()=> import('pages/quiz/TrainingResultPage.vue'),
    //     props: true
    // }
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