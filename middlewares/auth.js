//Before user can access the homepage, he must be login first and also has role as admin
// game.use(function( req, res, next) {
//     console.log("🚀 ~ user.use ~ req.session.userId:", req.session)
//     if(!req.session.user || !req.session.user.id) {
//         res.redirect('/user/login?error=please login first')
//     } else {
//         next()
//     }
// })

const isLogin = (function( req, res, next) {
    // console.log("🚀 ~ user.use ~ req.session.userId:", req.session)
    if(!req.session.user || !req.session.user.id) {
        res.redirect('/user/login?error=please login first')
    } else {
        next()
    }
})

// game.use(function( req, res, next) {
//     if(!req.session.user || req.session.user.role !== 'admin') {
//         res.redirect('/user/login?error=You have no access')
//     } else {
//         next()
//     }
// })

const isAdmin = (function( req, res, next) {
    if(!req.session.user || req.session.user.role !== 'admin') {
        res.redirect('/user/login?error=You have no access')
    } else {
        next()
    }
});


module.exports = {isLogin, isAdmin}