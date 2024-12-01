import React from "react";

const BenefitsSection = () => {
  return (
    <section className="product-benefits-section relative">
      <img
        src="/assets/images/bg-theme/ellipse8.png"
        className="productbg-1 animated"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse8.png"
        className="productbg-2 animated"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse5.png"
        className="productbg-3 animated"
        alt="background ellipse"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <p className="benefit-description weight-600 spaced-text">
              <span className="relative">
                <span class="quote-before">“</span>
                With Cootle,&nbsp;
              </span>
              teams can effortlessly
              <span className="accent-text"> define Product outcomes</span>,
              seamlessly
              <span className="deep-green-text"> track design efforts </span>
              toward them, and&nbsp;
              <span className="rich-purple-text">
                improve the overall value&nbsp;
              </span>
              of the
              <span className="vibrant-pink-text"> product team </span>
              across the&nbsp;
              <span className="relative">
                organisation.
                <span class="quote-after">”</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
