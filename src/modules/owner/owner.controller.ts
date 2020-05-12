import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { IOwnerDTO, IOwnerUpdate, IOwnerDeleteResponse } from './owner.interface';

@Controller('owner')
export class OwnerController {

  constructor(private service: OwnerService) {}

  @Get()
  findAllOwners(): Promise<Array<IOwnerDTO>> {
    return this.service.findAllOwners();
  }

  @Get(':id')
  findOwnerById(@Param('id') id: string): Promise<IOwnerDTO> {
    return this.service.findOwnerById(id);
  }

  @Put(':id')
  updateOwnerById(@Param('id') id: string, @Body() data: Partial<IOwnerUpdate>): Promise<IOwnerDTO> {
    return this.service.updateOwnerById(id, data);
  }

  @Delete(':id')
  deleteOwnerById(@Param('id') id: string): Promise<IOwnerDeleteResponse> {
    return this.service.deleteOwnerById(id);
  }
}
