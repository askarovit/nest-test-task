import  { IOwnerDTO } from '../../modules/owner/owner.interface';

export const OwnerSeed: Array<IOwnerDTO> = [
  { id: '11', name: 'Owner 1', purchaseDate: '2018-12-02' },
  { id: '12', name: 'Owner 2', purchaseDate: '2019-01-02'},
  { id: '13', name: 'Owner 3', purchaseDate: '2010-12-02' },
  { id: '14', name: 'Owner 4', purchaseDate: new Date().toISOString() },
  { id: '15', name: 'Owner 5', purchaseDate: '2009-12-02' }
];