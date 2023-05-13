const express = require('express')
const connection = require('../db/connection');
const validateCapitulo=require('../middlewares/validateCapitulo')
const route =express.Router()

route.get('/',async(req,res)=>{
    const [result] = await connection.execute('SELECT * FROM capitulos');
    res.status(200).json(result);
})
route.post('/',validateCapitulo, async (req, res) => {
    const {nomemanga,cap_num,manga_id} = req.body;
   
     const [result] = await connection.execute(
       'INSERT INTO capitulos(nomemanga,cap_num,manga_id) VALUES(?,?,?)', [nomemanga,cap_num,manga_id] 
       
     );
   
     const newP = {
       id:result.insertId,
       nomemanga,
       cap_num,
       manga_id
     }
   
     res.status(201).json(newP);
   })
   route.put('/:id',validateCapitulo,async (req, res) => {
     const {nomemanga,cap_num,manga_id} = req.body;
     const {id} = req.params;
 
     const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id =?',[id]);

    if(!result) {
      res.status(404).json({ message: 'Capitulo não encontrado!!!'})
    }

     const updateManga = await connection.execute(`UPDATE capitulos 
     SET nomemanga = ?, cap_num = ? ,manga_id=?
     WHERE id = ?`, [nomemanga,cap_num,manga_id, id])
    

     const newP = {
       id,
       nomemanga,
       cap_num,
       manga_id
     }
 
     res.status(201).json(newP);
 })
 route.delete('/:id',async(req,res)=>{
   const{id} = req.params;
  
   const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id =?',[id]);

   if(!result) {
     res.status(404).json({ message: 'Capitulo não encontrado!!!'})
   }

    await connection.execute('DELETE FROM capitulos WHERE id=?', [id])

   res.status(204).send();
 })

 route.get('/:id',async (req, res) => {
  const {id} = req.params;
  const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id =?',[id]);
  
  if(!result) {
    res.status(404).json({ message: 'Capitulo não encontrado!!!'})
  }
 
  res.status(200).json(result);
});
 

module.exports= route