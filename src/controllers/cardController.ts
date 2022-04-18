import{Request, Response } from "express";
import { faker } from '@faker-js/faker';
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export async function createCard(req: Request, res: Response) {
    const { type, employerId } = req.body;
    const apiKey = req.headers['x-api-key'] as string;
    const company = await companyRepository.findByApiKey(apiKey);
    const employee = await employeeRepository.findById(employerId);
    const cards = await cardRepository.findByTypeAndEmployeeId(type, employerId);
    //validando as regras de negocio
    if(!company){
        res.status(404).send("Invalid API Key");
    }
    if(cards){
        res.status(409).send("Card type already exists for this user")    
        ;
    }
    if(!employee){
        res.status(404).send("Employee not found");
    }
    if(company.id !== employee.companyId){
        res.status(404).send("Employee not found in this company");
    }

    const randomCard = faker.finance.creditCardNumber('master');
    // const cardCVV=faker.finance.creditCardCVV();
    const CVVDEFAULT = '123';
    const cardCVV = bcrypt.hashSync(CVVDEFAULT, 10);
    const expirationDate= dayjs().add(5,'year').format('MM-YY');
    const [first, ...rest] = employee.fullName.split(' ').filter((acc) => acc.length>2);
    const last = rest.pop();
    const named =[first, ...rest.map(n => n[0]), last].join(" ").toUpperCase();

    const cardData = {
        employerId:employerId,
        number:randomCard.toString(),
        cardholderName:named.toString(),
        securityCode:cardCVV,
        expirationDate:expirationDate.toString(),
        type:type,
    }
    // const card = await cardRepository.insert(cardData);

    //Criando o cartão
    // const cardData={
    //     employeeId:employerId,
    //     number:21323213,
    //     cardholderName:,
    //     securityCode,
    //     expirationDate,
    //     password,
    //     isVirtual,
    //     originalCardId,
    //     isBlocked,
    //     type,
    //   };





    res.status(201).send(named);     
}