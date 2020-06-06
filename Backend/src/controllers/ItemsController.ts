import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController{
  async index (req: Request, res: Response){
    const items = await knex('items').select('*');
 
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.15.12:3434/uploads/${item.image}`
      };
    });
  
    return res.json(serializedItems);
  }

  async delete(req:Request, res:Response){
    const { id } = req.params;

    await knex('items').where('id',id).delete();

    return res.status(201).send();
  }
}

export default ItemsController;