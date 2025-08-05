package com.orc.web.services;

import com.orc.web.entities.Owner;
import com.orc.web.repositories.OwnerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;
    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public void save(Owner owner) {
        ownerRepository.save(owner);
    }

    public void delete(Owner owner) {
        ownerRepository.deleteById(owner.getId());
    }

    public Optional<Owner> findById(Long id) {
        return ownerRepository.findById(id);
    }

    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }
}
