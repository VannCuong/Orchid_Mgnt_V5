package fu.se.chapter15api.services;

import fu.se.chapter15api.pojos.Orchid;
import fu.se.chapter15api.repositories.IOrchidRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class OrchidServiceTest {

    private IOrchidRepository repository;
    private OrchidService service;

    @BeforeEach
    void setUp() {
        repository = mock(IOrchidRepository.class);
        service = new OrchidService(repository);
    }

    @Test
    void insertOrchidClearsClientSuppliedId() {
        Orchid orchid = orchid(99, "New orchid");
        when(repository.save(orchid)).thenAnswer(invocation -> invocation.getArgument(0));

        Orchid saved = service.insertOrchid(orchid);

        assertNull(saved.getOrchidId());
        verify(repository).save(orchid);
    }

    @Test
    void updateOrchidChangesAllEditableFieldsAndKeepsId() {
        Orchid current = orchid(7, "Old name");
        Orchid input = orchid(88, "New name");
        input.setNatural(true);
        input.setOrchidDescription("Updated description");
        input.setOrchidCategory("Cattleya");
        input.setAttractive(true);
        input.setOrchidURL("https://example.com/orchid.jpg");
        when(repository.findById(7)).thenReturn(Optional.of(current));
        when(repository.save(current)).thenReturn(current);

        Optional<Orchid> updated = service.updateOrchid(7, input);

        assertTrue(updated.isPresent());
        assertEquals(7, updated.get().getOrchidId());
        assertEquals("New name", updated.get().getOrchidName());
        assertTrue(updated.get().isNatural());
        assertEquals("Updated description", updated.get().getOrchidDescription());
        assertEquals("Cattleya", updated.get().getOrchidCategory());
        assertTrue(updated.get().isAttractive());
        assertEquals("https://example.com/orchid.jpg", updated.get().getOrchidURL());
        verify(repository).save(current);
    }

    @Test
    void updateOrchidReturnsEmptyWhenIdDoesNotExist() {
        when(repository.findById(404)).thenReturn(Optional.empty());

        assertFalse(service.updateOrchid(404, orchid(null, "Missing")).isPresent());
        verify(repository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void deleteOrchidReturnsFalseWhenIdDoesNotExist() {
        when(repository.existsById(404)).thenReturn(false);

        assertFalse(service.deleteOrchid(404));
        verify(repository, never()).deleteById(404);
    }

    private Orchid orchid(Integer id, String name) {
        Orchid orchid = new Orchid();
        orchid.setOrchidId(id);
        orchid.setOrchidName(name);
        return orchid;
    }
}
