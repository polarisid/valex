import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

async function validateCreateCard(employeeId: number,apiKey: string,type: string){
    const employee = await employeeRepository.findById(employeeId);
    const company = await companyRepository.findByApiKey(apiKey);
    if (!employee) {
      throw new Error("Employee not found,404");
    }
    if (!company) {
      throw new Error("Business not found,404");
    }
    if (employee.companyId !== company.id) {
      throw new Error("Employee not found in this business");
    }

}
export{ validateCreateCard }