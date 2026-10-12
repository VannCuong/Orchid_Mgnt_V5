package fu.se.chapter15api.services;

import fu.se.chapter15api.pojos.Orchid;
import fu.se.chapter15api.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository repository;

    public OrchidService(IOrchidRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        return repository.findById(orchidID);
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        orchid.setOrchidId(null);
        return repository.save(orchid);
    }

    @Override
    public Optional<Orchid> updateOrchid(int orchidID, Orchid input) {
        return repository.findById(orchidID).map(current -> {
            current.setOrchidName(input.getOrchidName());
            current.setNatural(input.isNatural());
            current.setOrchidDescription(input.getOrchidDescription());
            current.setOrchidCategory(input.getOrchidCategory());
            current.setAttractive(input.isAttractive());
            current.setOrchidURL(input.getOrchidURL());
            return repository.save(current);
        });
    }

    @Override
    public boolean deleteOrchid(int orchidID) {
        if (!repository.existsById(orchidID)) {
            return false;
        }
        repository.deleteById(orchidID);
        return true;
    }
}
