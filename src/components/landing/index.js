import React from 'react'

const Home = ({ location }) => {
  return (
    <div>
      <section className="download text-center" id="download">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h3
                className="section-heading"
                style={{ fontSize: 50, color: '#fff' }}
              >
                Easy Learn Facilitates the communication between Students and
                Doctors
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <div className="container">
            <h2>
              {/* Stop waiting.
              <br />Start building. */}
              It's time to change Routine
            </h2>
            <a
              href="/students"
              className="btn btn-outline btn-xl js-scroll-trigger"
            >
              Let's Get Started!
            </a>
          </div>
        </div>
        <div className="overlay" />
      </section>
    </div>
  )
}

export default Home
