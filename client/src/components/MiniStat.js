import React from 'react'

const MiniStat = (props) => {
    return (
        <div className="col-sm-6 col-lg-3 ">
          <div className="rounded border shadow-sm d-flex justify-content-center justify-content-between p-4">
            <div className="mini-stat bx-shadow bg-white">
              <span className={`mini-stat-icon ${props.bg} rounded-circle p-1`} >
                <i className={props.icon}></i>
              </span>
            </div>
            <div className="mini-stat-info text-right text-dark h5 ">
              <span className="counter text-dark">{props.data} </span>
              {props.label}
            </div>
          </div>
        </div>
    )
}

export default MiniStat
