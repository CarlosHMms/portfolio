package com.orc.web.resources;

import com.orc.web.entities.Owner;
import com.orc.web.services.OwnerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class OwnerResources {
    private final OwnerService ownerService;
    public OwnerResources(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @GetMapping("/owners")
    public ResponseEntity<List<Owner>> findAll() {
        return ResponseEntity.ok(ownerService.findAll());
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<Optional<Owner>> findById(@PathVariable Long id){
        return ResponseEntity.ok(ownerService.findById(id));
    }

    @PostMapping("/owner")
    public ResponseEntity<Void> create(@RequestBody Owner owner){
        ownerService.save(owner);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/owner")
    public ResponseEntity<Void> delete(@RequestBody Owner owner){
        ownerService.delete(owner);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
