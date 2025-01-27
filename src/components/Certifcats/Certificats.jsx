import React, { useState, useRef } from 'react'; 
import certificates from '../../Data/certificats.json'; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import Modal from 'react-modal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';  
import './Certificates.css';

Modal.setAppElement('#root');

function Certificates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificat, setCurrentCertificat] = useState(null);

  const swiperRef = useRef(null);

  const openModal = (certificat) => {
    setCurrentCertificat(certificat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCertificat(null);
  };

  return (
    <section className="certificats-container">
        <h2 className='sectionh2'>Mes Certificats</h2>
      <Swiper
        ref={swiperRef} 
        spaceBetween={30} 
        slidesPerView={3} 
        loop={true}
        speed={500}
        breakpoints={{
          100: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {certificates.certificats.map((certificat) => (
          <SwiperSlide key={certificat.id} onClick={() => openModal(certificat)}>
            <article className="certificat-card">
              <img 
                src={certificat.image} 
                alt={certificat.alt || 'Certificat'}
                className="certificat-image" 
              />
              {certificat.tittle && <h3 className="certificat-title">{certificat.tittle}</h3>}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-buttons">
        <button className="swiper-button-left" onClick={() => swiperRef.current.swiper.slidePrev()} aria-label="Précédent">
          <FaChevronLeft className='flecheswipper' />
        </button>
        <button className="swiper-button-right" onClick={() => swiperRef.current.swiper.slideNext()} aria-label="Suivant">
          <FaChevronRight className='flecheswipper' />
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Certificat Détail"
        className="modal-content modal-content-certificats"
        overlayClassName="modal-overlay"
      >
        {currentCertificat && (
          <section className="modal-body">
            <button className="close-modal" onClick={closeModal}>X</button>
            <img 
              src={currentCertificat.image} 
              alt={currentCertificat.alt || 'Certificat sans titre'} 
              className="modal-certificat-image" 
              loading="lazy"
              width="250"
              height="200"
            />
            <h3>{currentCertificat.tittle}</h3>
            <p>{currentCertificat.description || 'Certificat obtenu en cours de formation Openclassrooms.'}</p>
          </section>
        )}
      </Modal>
    </section>
  );
}

export default Certificates;
