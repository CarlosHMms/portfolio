package com.orc.web.repositories;

import com.orc.web.entities.Spreadsheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpreadsheetRepository extends JpaRepository<Spreadsheet, Long> {

}
