import { createWebHistory, createRouter } from "vue-router";
import Index from '../pages/index.vue'
import Topbar from '../layout/topbar.vue'
import AdminBar from '../layout/adminBar.vue'
import Single from '../pages/single.vue'
import Listing from '../pages/list.vue'
import singleAgent from '../pages/agent-single.vue'
import addList from '../pages/add-list.vue'
import notFound from '../pages/404.vue'
import Dashboard from '../pages/admin/dashboard.vue'
import Members from '../pages/admin/members.vue'
import Login from '../pages/admin/login.vue'
import Profile from '../pages/profile.vue'
import Compare from '../pages/compare.vue'
import Properties from '../pages/admin/properties'
import Reports from '../pages/admin/reports'

const routes = [{
    path: '/',
    component: Topbar,
    children: [
        {
            path: '/',
            name: 'home',
            meta: {
                auth: false,
                admin: false,
                title: 'Нүүр'
            },
            component: Index
        },
        {
            path: '/single/:id',
            name: 'Property Single',
            meta: {
                auth: false,
                admin: false,
                title: 'Зарын дэлгэрэнгүй'
            },
            component: Single
        },
        {
            path: '/list',
            name: 'Listing',
            meta: {
                auth: false,
                admin: false,
                title: 'Жагсаалт'
            },
            component: Listing
        },
        {
            path: '/agent/:id',
            name: 'agent',
            meta: {
                auth: false,
                admin: false,
                title: 'Агент'
            },
            component: singleAgent
        },
        {
            path: '/add-list',
            meta: {
                auth: true,
                admin: false,
                title: 'Зар оруулах'
            },
            name: 'add-list',
            component: addList
        },
        {
            path: '/compare',
            meta: {
                auth: false,
                admin: false,
                title: 'Харьцуулах'
            },
            name: 'compare',
            component: Compare
        },
        {
            path: '/profile',
            meta: {
                auth: true,
                admin: false,
                title: 'Хувийн мэдээлэл'
            },
            name: 'profile',
            component: Profile
        }]
    },
    {
        path: '/admin',
        component: AdminBar,
        children: [
            {
                path: 'dashboard',
                meta: {
                    auth: true,
                    admin: true,
                    title: 'Dashboard'
                },
                name: 'admin-dashboard',
                component: Dashboard
            },
            {
                path: 'members',
                meta: {
                    auth: true,
                    admin: true,
                    title: 'Members'
                },
                name: 'admin-members',
                component: Members
            },
            {
                path: 'properties',
                meta: {
                    auth: true,
                    admin: true,
                    title: 'Properties'
                },
                name: 'admin-props',
                component: Properties
            },
            {
                path: 'reports',
                meta: {
                    auth: true,
                    admin: true,
                    title: 'Reports'
                },
                name: 'admin-reports',
                component: Reports
            }
        ]
    },
    {
        path: '/admin/login',
        meta: {
            auth: false,
            admin: false,
            title: 'login'
        },
        name: 'admin-login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            auth: false,
            admin: false,
            title: 'Хуудас олдсонгүй'
        },
        name: 'page-not-found',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const auth = {
	loggedIn(admin) {
		var token = localStorage.getItem("token");
		if (token) {
            if (admin) {
                var tokenEmp = localStorage.getItem("edit_to");

                if (tokenEmp) {
                    return 'logged'
                } else {
                    return 'permissiondenied'
                }
            } else {    
                return 'logged';
            }
		} else {
            if (admin) {
                var tokenEmp = localStorage.getItem("edit_to");

                if (tokenEmp) {
                    return 'logged'
                } else {
                    return 'permissiondenied'
                }
            } else {    
                return 'notlogged';
            }
		}
	}
}

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let authrequired = false
    if(to && to.meta && to.meta.auth)
		authrequired = true
    
    if(authrequired) {
        const tk = auth.loggedIn(to.meta.admin);
        tk == 'logged' ? next() : (to.meta.admin ? ( alert('Permission denied'), router.push({ path: '/admin/login' })) : router.push({ path: '/', query: { login: false }}));
    } else {
        if (to.path === '/admin/login') {
            var tokenEmp = localStorage.getItem("edit_to");
            if (tokenEmp) {
                router.push({ path: '/admin/dashboard' })
            } else {
                next();
            }
        } else {
            next();
        }
    }
})

export default router