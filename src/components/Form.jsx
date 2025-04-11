import React from 'react'

const Form = ({title,children,formSubmission,link}) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
    <div className="col-md-6 mt-3">
 <h1>{title}</h1>
     <form method="post" onSubmit={formSubmission}>
     <div className="row">
         {children}
     </div><br/>
     </form>
     {link}
 </div>
</div>
  )
}

export default Form