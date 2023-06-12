import { Body, Controller, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import {  CreateCompDto } from 'src/DTO/createComp';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/userRequest';
import { UpdateCompDto } from 'src/DTO/updateComp';

@Controller('compliance')
export class ComplianceController {
    constructor(private compService: ComplianceService) {}

    @UseGuards(JwtAuthGuard)
    @Post("/new")
    async addCompliance(@Body(ValidationPipe) createCompDto: CreateCompDto, @Req() request: RequestWithUser) {
        const user = request.user;
        return await this.compService.createComp(createCompDto,user);
    }

    @Patch("/:id/compliance-update")
    async updateCompliance(@Body() updateCompDto: UpdateCompDto, @Param("id", ParseIntPipe) id: number) {
        return await this.compService.updateComp(id, updateCompDto)
    }
}
