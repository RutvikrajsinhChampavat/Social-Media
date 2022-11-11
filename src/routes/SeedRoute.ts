import * as Joi from '@hapi/joi'
import { Router } from "express";
import { faker } from '@faker-js/faker';
const router = Router();
router.post("/seed/posts",(req,res)=>{
  for(let i =0;i<30;i++){
    let newPost = {
      tag:['tech','finance'],
      title:faker.lorem.sentence(8),
      body:faker.lorem.paragraphs(3, '<br/>\n'),
      company:faker.company.name(),
      createdAt:faker.date.recent(),
      userName:faker.name.firstName()
    }
    
  }
});
export default router;