package com.qa.test.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.dto.BookingDTO;
import com.qa.domain.Booking;
import com.qa.repo.BookingRepository;
import com.qa.service.BookingService;

@RunWith(SpringRunner.class)
public class BookingServiceUnitTest {

    @InjectMocks
    private BookingService service;

    @Mock
    private BookingRepository repo;

    @Mock
    private ModelMapper mapper;

    private List<Booking> bookingList;

    private Booking testBooking;

    private Booking testBookingWithID;

    private BookingDTO bookingDTO;

    final long id = 1L;

    @Before
    public void init() {
        this.bookingList = new ArrayList<>();
        this.bookingList.add(testBooking);
        this.testBooking = new Booking(1L, "Shrek 3", "27/05/2020 15:30", BigDecimal.valueOf(13.99),"email@email.com","0044 771234123","Jeff Tester",1,1,0);
        this.testBookingWithID = new Booking(testBooking.getMovieName(),testBooking.getDateTime(),testBooking.getTotalPrice(),testBooking.getEmailAddress(),testBooking.getPhoneNumber(),testBooking.getCustomerName(),testBooking.getAdultNr(),testBooking.getChildNr(),testBooking.getStudentNr());
        this.testBookingWithID.setId(id);
        this.bookingDTO = new ModelMapper().map(testBookingWithID, BookingDTO.class);
    }

    @Test
    public void createBookingTest() {
        when(this.repo.save(testBooking)).thenReturn(testBookingWithID);
        when(this.mapper.map(testBookingWithID, BookingDTO.class)).thenReturn(bookingDTO);

        assertEquals(this.bookingDTO, this.service.createBooking(testBooking));

        verify(this.repo, times(1)).save(this.testBooking);
    }

    @Test
    public void deleteBookingTest() {
        when(this.repo.existsById(id)).thenReturn(true, false);

        this.service.deleteBooking(id);

        verify(this.repo, times(1)).deleteById(id);
        verify(this.repo, times(2)).existsById(id);
    }

    @Test
    public void findBookingByIDTest() {
        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testBookingWithID));
        when(this.mapper.map(testBookingWithID, BookingDTO.class)).thenReturn(bookingDTO);

        assertEquals(this.bookingDTO, this.service.findBookingByID(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    public void readBookingsTest() {

        when(repo.findAll()).thenReturn(this.bookingList);
        when(this.mapper.map(testBookingWithID, BookingDTO.class)).thenReturn(bookingDTO);

        assertFalse("Controller has found no bookings", this.service.readBookings().isEmpty());

        verify(repo, times(1)).findAll();
    }

    @Test
    public void updateBookingsTest(){
        Booking newBooking = new Booking(testBookingWithID.getId(), "Shrek 3", "28/05/2020 15:30", BigDecimal.valueOf(11.99),"email@email.com","0044 134512312","Jeff Tester",1,2,0);

        Booking updatedBooking = new Booking(newBooking.getMovieName(),newBooking.getDateTime(),newBooking.getTotalPrice(),newBooking.getEmailAddress(),newBooking.getPhoneNumber(),newBooking.getCustomerName(),newBooking.getAdultNr(),newBooking.getChildNr(),newBooking.getStudentNr());
        updatedBooking.setId(this.id);

        BookingDTO updatedDTO = new ModelMapper().map(updatedBooking, BookingDTO.class);


        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testBookingWithID));
        when(this.mapper.map(updatedBooking, BookingDTO.class)).thenReturn(updatedDTO);

        when(this.repo.save(updatedBooking)).thenReturn(updatedBooking);

        assertEquals(updatedDTO, this.service.updateBooking(newBooking, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedBooking);
    }

}