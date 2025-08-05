package com.orc.web.resources;

import com.orc.web.DTOs.spreadsheet.CreateSpreadsheetDTO;
import com.orc.web.entities.Spreadsheet;
import com.orc.web.services.SpreadsheetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class SpreadsheetResources {
    SpreadsheetService spreadsheetService;
    public SpreadsheetResources(SpreadsheetService spreadsheetService) {
        this.spreadsheetService = spreadsheetService;
    }

    @GetMapping("/spreadSheets")
    public ResponseEntity<List<Spreadsheet>> findAll() {
        return ResponseEntity.ok(spreadsheetService.findAll());
    }
    @GetMapping("/spreadSheet/{id}")
    public ResponseEntity<Optional<Spreadsheet>> findById(@PathVariable Long id){
        return ResponseEntity.ok(spreadsheetService.findById(id));
    }
    @PostMapping("/spreadSheet")
    public ResponseEntity<Void> create(@RequestBody CreateSpreadsheetDTO spreadsheet) {
        spreadsheetService.save(spreadsheet);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @DeleteMapping("/spreadSheet/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        spreadsheetService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
