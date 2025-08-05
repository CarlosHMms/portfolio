package com.orc.web.services;

import com.orc.web.DTOs.spreadsheet.CreateSpreadsheetDTO;
import com.orc.web.entities.Owner;
import com.orc.web.entities.Spreadsheet;
import com.orc.web.repositories.SpreadsheetRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpreadsheetService {
    SpreadsheetRepository spreadsheetRepository;
    OwnerService ownerService;
    public SpreadsheetService(SpreadsheetRepository spreadsheetRepository,  OwnerService ownerService) {
        this.spreadsheetRepository = spreadsheetRepository;
        this.ownerService = ownerService;
    }

    public void save(CreateSpreadsheetDTO spreadsheet) {
        Owner owner = ownerService.findById(spreadsheet.ownerId())
                .orElseThrow(()-> new EntityNotFoundException("Owner not found"));
        Spreadsheet spreadsheetEntity = Spreadsheet.builder()
                .title(spreadsheet.title())
                .spreadSheetStruct(spreadsheet.spreadSheetStruct())
                .owner(owner)
                .build();
        spreadsheetRepository.save(spreadsheetEntity);
    }
    public void delete(Long id) {
        spreadsheetRepository.deleteById(id);
    }
    public List<Spreadsheet> findAll() {
        return spreadsheetRepository.findAll();
    }

    public Optional<Spreadsheet> findById(Long id){
        return spreadsheetRepository.findById(id);
    }


}
