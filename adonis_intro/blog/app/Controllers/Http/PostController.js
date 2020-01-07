'use strict'
const Post = use('App/Models/Post') // direk post modele ulaşabiliriz
class PostController {
    index = async ({ view }) => {
        //return "Burası controller'dan(Post) gelen index"
        const post_list = await Post.all() // arada db bağlantısı olduğundan 'await' ile bu arkadaşı bekliyoruz
        const context = {
            title: 'Yazılar',
            // post_list:[
            //     {title:'Deneme1'},
            //     {title:'Deneme2'},
            //     {title:'Deneme3'},
            //     {title:'Deneme4'},
            //     {title:'Deneme5'},
            // ],
            post_list: post_list.toJSON(), // bu arkadaşı view'da kullanabilmek için json'a çevirip yollamalıyız
        }
        return view.render('post_content.index', context) // bu şekilde data yollayabiliriz. django'daki mantığın aynısı. bir dict(obje) yollamak lazım
    }
    home = async ({ view }) => {
        const context = {
            title: 'Anasayfa',
        }
        return view.render('index', context)
    }
    detail = async ({ view, params }) => {
        const post = await Post.find(params.id) // params.id'e sahip id'li postu getir
        const context = {
            title: `Detay (${post.title})`,
            post:post,
        }
        return view.render('post_content.post_detail', context)
    }
}

module.exports = PostController // route'larda çağırırken bu şekilde çağıracağız
