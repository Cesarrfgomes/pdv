import 'dotenv/config'
import express from 'express'
import rotas from './rotas'

const app = express()

app.use(express.json())
app.use(rotas)

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado na porta 3000')
})