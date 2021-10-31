import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';


const Modal = ({ isShowing, hide, item }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal fade bd-example-modal-lg"
      // nhớ phải thêm sự kiện onblur để ẩn k nó sẽ k xóa Portal cũ làm hiện lại Modal cũ chứ k hiện modal mới click
      tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" onBlur={hide}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="py-3 mb-20" >
            <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
              {item.TEN}
            </h3>
          </div>
          {item.SANPHAM.length === 0 ? "Dòng sản phẩm này chưa có sản phẩm" :
            <>
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="col-md-3">MÃ sản phẩm</th>
                    <th className="col-md-3">Giá</th>
                    <th className="col-sm-3">Dung tích</th>
                    <th className="col-md-3">Số lượng tồn</th>
                  </tr>
                </thead>
                <tbody>
                  {item.SANPHAM.map((sp, index) => {
                    return <tr key={index}>
                      <td>{sp.MA_SP}</td>
                      <td><NumberFormat value={sp.GIA} thousandSeparator={true} suffix={'đ'} displayType={'text'}/></td>
                      <td>{sp.DUNGTICH}&nbsp;ml</td>
                      <td>{sp.SOLUONGTON}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </>
          }
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;