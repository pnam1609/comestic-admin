import React, { useState, useEffect } from 'react'
import "./../../assets/css/sb-admin-2.min.css"
import { connect } from 'react-redux'
import OrderSupplyItem from './OrderSupplyItem'
import NavigationSwitchPage from './../Navigation/NavigationSwitchPage'
import { Link } from 'react-router-dom'
import { actFetchOrderSupplysRequest } from '../../actions/orderSupply'

const OrderSupply = ({ orderSupply, onFetchOrderSupply }) => {
    const [filter, setfilter] = useState("")
    const [pages, setpages] = useState(1)

    function filterLineProductByName(list, value) {
        if (value === null || value === undefined) return list
        else {
            list = list.filter(params => {
                return params.orderSupplyId.toString().indexOf(value.toString()) !== -1;
            })//|| params.TRANGTHAI.toLowerCase().indexOf(value.toLowerCase()) !== -1
            return list
        }
    }
    orderSupply = filterLineProductByName(orderSupply, filter)

    var orderSupplyList = orderSupply.map((order, index) => {
        if (index >= (pages - 1) * 10 && index < pages * 10) {
            return <OrderSupplyItem item={order} key={index} />
        }
        return null
    })

    useEffect(() => {
        // phải dung asyn vì nó sẽ fetch ra lise line product k kịp dẫn tới lấy state cũ 
        //vì state mới chưa kịp thay đổi do dang trong thời gian fetch
        async function fectchLinepro() {
            await onFetchOrderSupply()
        }
        fectchLinepro()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <div className="container-fluid">

            {/* <!-- Page Heading --> */}
            <h1 className="h3 mb-2 text-gray-800">ĐƠN ĐẶT HÀNG TỪ HÃNG</h1>



            {/* <!-- DataTales Example --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Dữ liệu bảng</h6>
                    <div className="row">
                        <div className="col-xl-12 d-flex justify-content-end" >
                            <Link to="/addOrderSupply">
                                <button type="button" className="btn btn-success " style={{ marginRight: 25, marginBottom: 5 }}>Thêm</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6" >
                            <div className="dataTables_length" id="dataTable_length">
                                <label className="d-flex flex-row" >
                                    <span className="px-2">Hiện</span>
                                    <span>
                                        <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                            <option value="10">10</option>
                                            {/* <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option> */}
                                        </select>
                                    </span>
                                    <span className="px-2">Đơn đặt hàng</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="container">
                                <div id="dataTable_filter" className="dataTables_filter">
                                    <label className="d-flex flex-row">
                                        <div className="px-2">Search:</div>
                                        <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="" onChange={(e) => setfilter(e.target.value)} />
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="col-md-1">Mã DDH</th>
                                    <th className="col-md-1">Ngày đặt</th>
                                    <th className="col-md-1">Ngày nhận hàng</th>
                                    <th className="col-md-3">Trạng thái</th>
                                    <th className="col-md-2">Mã hãng</th>
                                    <th className="col-md-1">Mã NV</th>
                                    <th className="col-md-2">Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th className="col-md-1">Mã DDH</th>
                                    <th className="col-md-2">Ngày đặt</th>
                                    <th className="col-md-2">Ngày nhận hàng</th>
                                    <th className="col-md-1">Trạng thái</th>
                                    <th className="col-md-2">Mã hãng</th>
                                    <th className="col-md-1">Mã NV</th>
                                    <th className="col-md-2">Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {orderSupplyList}
                            </tbody>
                        </table>
                        <NavigationSwitchPage entries={orderSupply.length} onReceivePage={p => setpages(p)} />
                    </div>
                </div>
            </div>
        </div >
    )
}



const mapStateToProps = (state) => ({
    orderSupply: state.orderSupply
})

const mapDispatchToProps = (dispatch) => {
    return ({
        onFetchOrderSupply: () => {
            dispatch(actFetchOrderSupplysRequest())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSupply)
