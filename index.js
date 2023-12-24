const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000


// DBU: userManagement
// DBP: 0z0Ihd13OVhFyyza


app.use(express.json())
app.use(cors())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://userManagement:0z0Ihd13OVhFyyza@cluster0.zoyeiku.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
       

        const taskCollection = client.db('taskDB').collection('task')
        const userCollection = client.db('taskDB').collection('users')


        app.get('/tasks/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {user: email}
            const result = await taskCollection.find(filter).toArray()
            res.send(result)
        })

        app.get('/signle-task/:id', async(req, res) =>{
            const Id = req.params.id
            const query = {_id: new ObjectId(Id)}
            const result = await taskCollection.findOne(query)
            res.send(result)
            
        })

        app.put('/update-task/:id', async(req, res) =>{
            const Id = req.params.id
            const taskData = req.body
            const filter = {_id: new ObjectId(Id)}
            const UpdateTask = {
                $set: {
                    title: taskData.title,
                    description: taskData.description,
                    deadline: taskData.deadline,
                    priority: taskData.priority,
                    status: taskData.status
                }
            }
            const result = await taskCollection.updateOne(filter, UpdateTask)
            res.send(result)
        })


        app.get('/rending-task/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Pending'}
                ]
            }
            const result = await taskCollection.find(filter).toArray()
            res.send(result)
        })


        app.get('/countPending/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Pending'}
                ]
            }
            const result = await taskCollection.countDocuments(filter)
            res.send({result})
        })



        app.get('/complate-task/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Complate'}
                ]
            }
            const result = await taskCollection.find(filter).toArray()
            res.send(result)
        })

        app.get('/countComplate/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Complate'}
                ]
            }
            const result = await taskCollection.countDocuments(filter)
            res.send({result})
        })

        app.get('/progress-task/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Progress'}
                ]
            }
            const result = await taskCollection.find(filter).toArray()
            res.send(result)
        })


        app.get('/countPrograse/:email', async(req, res) =>{
            const email = req.params.email
            const filter = {
                $and: [
                    {user: email},
                    {status: 'Progress'}
                ]
            }
            const result = await taskCollection.countDocuments(filter)
            res.send({result})
        })


        app.delete('/task-delete/:id', async(req, res) =>{
            const Id = req.params.id
            const query = {_id: new ObjectId(Id)}
            const result = await taskCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/task', async(req, res) =>{
            const Task = req.body
            const result = await taskCollection.insertOne(Task)
            res.send(result)
        })

        app.post('/users', async(req, res) =>{
            const userData = req.body
            const result = await userCollection.insertOne(userData)
            res.send(result)
        })

        app.get('/user/:email', async(req, res) =>{
            const email = req.params.email
            const query = {email: email}
            const result = await userCollection.findOne(query)
            res.send(result)
        })

        app.get('/all-user', async(req, res) =>{
            const result = await userCollection.find().toArray()
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send("TaskNest server is runing...")
})

app.listen(port, () => {
    console.log(`My server running on ${port}`)
})