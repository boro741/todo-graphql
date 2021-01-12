const Query = {
    todo(parent, args, {db}, info){
        if(args.title == null) 
            return db.Todos;

        /*  const todo = await prisma.query.Todo({
                where: {
                    title: args.title
                }
            },{
                id
                title
                tasks {
                    task
                }
            }
            );    
         */
        return db.Todos.filter((todo)=>{
            return todo.title.toLowerCase().includes(args.title.toLowerCase());
        });
    },
    task(parent, args, {db}, info){
        if(args.title == null){
            return db.Tasks;
        }

        return db.Tasks.filter((task) => {
            return db.Todos.find((todo) => todo.id === task.title).title.toLowerCase().includes(args.title.toLowerCase());
        });
    }
}

export {Query as default};