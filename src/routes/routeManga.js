const express = require("express");

const connection = require("../db/connection");

const validateManga = require('../middlewares/validateManga')
const route = express.Router();

route.get('/', async(req,res)=>{
    
    const [result] = await connection.execute('SELECT * FROM mangas');
    res.status(200).json(result);
});

route.post('/',validateManga, async (req, res) => {
   const {nomemanga, synopsis,author,themes,status,genres,capamanga} = req.body;
  
    const [result] = await connection.execute(
      'INSERT INTO mangas(nomemanga, synopsis,author,themes,status,genres,capamanga) VALUES(?,?,?,?,?,?,?)', [nomemanga, synopsis,author,themes,status,genres,capamanga] 
    );
  
    const newP = {
      id:result.insertId,
      nomemanga, 
      synopsis,
      author,
      themes,
      status,
      genres,
      capamanga
    }
  
    res.status(201).json(newP);
  })
  route.put('/:id',validateManga,async (req, res) => {
    const {nomemanga, synopsis,author,themes,status,genres,capamanga} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);

    if(!result) {
      res.status(404).json({ message: 'Manga não encontrado!!!'})
    }

    const updateManga = await connection.execute(`UPDATE mangas 
    SET nomemanga = ?, synopsis = ?,author = ?,themes = ?,status = ? ,genres=?,capamanga=?
    WHERE id = ?`, [nomemanga, synopsis,author,themes,status,genres,capamanga, id])

    const newP = {
      id,
      nomemanga, 
      synopsis,
      author,
      themes,
      status,
      genres,
      capamanga
    }

    res.status(201).json(newP);
})
route.delete('/:id',async(req,res)=>{
  const{id} = req.params;

  const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);

  if(!result) {
    res.status(404).json({ message: 'Manga não encontrado!!!'})
  }

   await connection.execute('DELETE FROM mangas WHERE id=?', [id])

  res.status(204).send();
})
route.get('/:id',async (req, res) => {
  const {id} = req.params;
  const [[result]] = await connection.execute('SELECT * FROM mangas WHERE id =?',[id]);

  if(!result) {
    res.status(404).json({ message: 'Manga não encontrado!!!'})
  }

  res.status(200).json(result); 
});

module.exports = route;
