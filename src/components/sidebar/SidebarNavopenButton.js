import React from "react";

function SidebarNavopenButton(values) {
  return (
      <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseVoucher"
             aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas fa-fw fa-wrench"></i>
              <span>A/c - Vouchers </span>
          </a>
          <div id="collapseVoucher" className="collapse" aria-labelledby="headingUtilities"
               data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="#">Journal Voucher</a>
                  <a className="collapse-item" href="#">Payment Voucher</a>
                  <a className="collapse-item" href="#">Receipt Voucher</a>
                  <a className="collapse-item" href="#">Contra Voucher</a>
              </div>
          </div>
      </li>
  );
}

export default SidebarNavopenButton;
