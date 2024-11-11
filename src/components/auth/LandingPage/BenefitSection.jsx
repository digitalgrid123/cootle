import React from "react";

const BenefitsSection = () => {
  return (
    <section className="product-benefits-section  relative">
      <img
        src="/assets/images/bg-theme/ellipse7.png"
        className="productbg-1"
        alt="background ellipse"
      />
      <img
        src="/assets/images/bg-theme/ellipse6.png"
        className="productbg-2"
        alt="background ellipse"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <p className="benefit-description weight-600">
              With Cootle, teams can effortlessly
              <span className="accent-text">define Product outcomes</span>,
              seamlessly
              <span className="deep-green-text">track design efforts</span>
              toward them, and
              <span className="rich-purple-text">
                improve the overall value
              </span>
              of the
              <span className="vibrant-pink-text">product team</span> across the
              organisation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
