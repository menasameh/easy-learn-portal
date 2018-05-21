import React from 'react'

const Home = ({ location }) => {
  return (
    <div>
      <section class="download bg-primary text-center" id="download">
        <div class="container">
          <div class="row">
            <div class="col-md-8 mx-auto">
              <h2 class="section-heading">
                Discover what all the buzz is about!
              </h2>
              <p>
                Our app is available on any mobile device! Download now to get
                started!
              </p>
              <div class="badges">
                <a class="badge-link" href="#">
                  <img src="img/google-play-badge.svg" alt="" />
                </a>
                <a class="badge-link" href="#">
                  <img src="img/app-store-badge.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="features" id="features">
        <div class="container">
          <div class="section-heading text-center">
            <h2>Unlimited Features, Unlimited Fun</h2>
            <p class="text-muted">
              Check out what you can do with this app theme!
            </p>
            <hr />
          </div>
          <div class="row">
            <div class="col-lg-4 my-auto">
              <div class="device-container">
                <div class="device-mockup iphone6_plus portrait white">
                  <div class="device">
                    <div class="screen">
                      <img
                        src="img/demo-screen-1.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="button" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8 my-auto">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="feature-item">
                      <i class="icon-screen-smartphone text-primary" />
                      <h3>Device Mockups</h3>
                      <p class="text-muted">
                        Ready to use HTML/CSS device mockups, no Photoshop
                        required!
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="feature-item">
                      <i class="icon-camera text-primary" />
                      <h3>Flexible Use</h3>
                      <p class="text-muted">
                        Put an image, video, animation, or anything else in the
                        screen!
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="feature-item">
                      <i class="icon-present text-primary" />
                      <h3>Free to Use</h3>
                      <p class="text-muted">
                        As always, this theme is free to download and use for
                        any purpose!
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="feature-item">
                      <i class="icon-lock-open text-primary" />
                      <h3>Open Source</h3>
                      <p class="text-muted">
                        Since this theme is MIT licensed, you can use it
                        commercially!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="cta-content">
          <div class="container">
            <h2>
              Stop waiting.
              <br />Start building.
            </h2>
            <a href="#contact" class="btn btn-outline btn-xl js-scroll-trigger">
              Let's Get Started!
            </a>
          </div>
        </div>
        <div class="overlay" />
      </section>

      <section class="contact bg-primary" id="contact">
        <div class="container">
          <h2>
            We
            <i class="fa fa-heart" />
            new friends!
          </h2>
          <ul class="list-inline list-social">
            <li class="list-inline-item social-twitter">
              <a href="#">
                <i class="fa fa-twitter" />
              </a>
            </li>
            <li class="list-inline-item social-facebook">
              <a href="#">
                <i class="fa fa-facebook" />
              </a>
            </li>
            <li class="list-inline-item social-google-plus">
              <a href="#">
                <i class="fa fa-google-plus" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Home
