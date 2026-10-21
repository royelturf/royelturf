import React from 'react'

const Map = () => {
    return (
        <>
            <section className='map'>
                <div className="container">
                    <h2 className='primary-heading map__heading'>Our Location</h2>
                    <div className="map__content">
                        <div className='map__skyturf'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.4280489742764!2d90.99662337440247!3d24.07258087633313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37541d001ebaed2b%3A0x5adbe8b080a1b0a9!2sBhairab%20turf%20%26%20swimming%20zone!5e1!3m2!1sen!2sbd!4v1792501130731!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className='map__map'
                            ></iframe>
                            <h3 className='our-turfs__turf-name'>Royel Turf & Swimming Zone</h3>
                            <p className='our-turfs__turf-text'>The Home of Football in Buchi</p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Map