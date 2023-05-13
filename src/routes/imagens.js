const express = require("express");

const connection = require("../db/connection");

const validateImagens = require('../middlewares/validateImagens')

const route = express.Router();

route.get('/', async(req,res)=>{
    
    const [result] = await connection.execute('SELECT * FROM imagens');
    res.status(200).json(result);
});

route.post('/',validateImagens, async (req, res) => {
   const { pag_num, imag_url,cap_id} = req.body;
  
    const [result] = await connection.execute(
      'INSERT INTO imagens( pag_num, imag_url,cap_id) VALUES(?,?,?)', [ pag_num, imag_url,cap_id] 
    );
  
    const newP = {
      id:result.insertId,
      pag_num,
      imag_url,
      cap_id
    }
  
    res.status(201).json(newP);
  })
  route.put('/:id',validateImagens,async (req, res) => {
    const { pag_num, imag_url,cap_id} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM imagens WHERE id =?',[id]);

    if(!result) {
      res.status(404).json({ message: 'imagem não encontrado!!!'})
    }

    const updateManga = await connection.execute(`UPDATE imagens 
    SET pag_num = ?, imag_url = ? ,cap_id = ?
    WHERE id = ?`, [ pag_num, imag_url,cap_id, id])

    const newP = {
      id,
      pag_num,
      imag_url,
      cap_id
    }

    res.status(201).json(newP);
})
route.delete('/:id',async(req,res)=>{
  const{id} = req.params;

  const [[result]] = await connection.execute('SELECT * FROM imagens WHERE id =?',[id]);

  if(!result) {
    res.status(404).json({ message: 'imagem não encontrado!!!'})
  }

   await connection.execute('DELETE FROM imagens WHERE id=?', [id])

  res.status(204).send();
})
route.get('/:id',async (req, res) => {
  const {id} = req.params;
  const [[result]] = await connection.execute('SELECT * FROM imagens WHERE id =?',[id]);
 
  if(!result) {
    res.status(404).json({ message: 'imagem não encontrado!!!'})
  }
 
  res.status(200).json(result);
});


module.exports=route