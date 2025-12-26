import { Link } from "react-router-dom"

const TeamDetails = () => {
   return (
      <div className="td-team-details-area pt-100 pb-100">
         <div className="container">
            <div className="row mb-50">
               <div className="col-lg-6">
                  <div className="td-team-details-title-wrap">
                     <h2 className="td-section-title mb-30 td-text-invert">Meet Our Leader</h2>
                     <p className="td-section-text mr-200">Get to know the creative mind behind our vision and design philosophy.</p>
                  </div>
               </div>
            </div>
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="td-team-details-thumb mb-40 wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="1s">
                     <img src="/assets/img/team/details/thumb.png" alt="" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="td-team-details-content mt-60 mb-40 wow fadeInRight" data-wow-delay=".5s" data-wow-duration="1s">
                     <span className="td-team-details-subtitle mb-10">I am a professional designer</span>
                     <h2 className="td-team-details-title mb-20">Brandon Hussy</h2>
                     <p className="mb-20">On the other hands, we denounce with righteous indignation dislikes men who are so beguiled and demoralized by the charms of pleasure of the moment so blinded by desire that they cannot foresee the pain and trouble that are bound to ensue.
                        When he's not building strong alliances with other creatives, project managers and stakeholders alike, you'll find him giving voice to client strategies with key compelling</p>
                     <div className="td-team-details-tag-list mb-35">
                        <h5 className="td-team-details-tag-title mb-15">Portfolio:</h5>
                        <ul>
                           <li><Link to="#">Behance</Link></li>
                           <li><Link to="#">Dribbble</Link></li>
                           <li><Link to="#">Meduim</Link></li>
                        </ul>
                     </div>
                     <div className="td-team-details-social td-footer-social">
                        <h5 className="td-team-details-tag-title mb-15">Follow:</h5>
                        <Link to="#">
                           <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.33161 6.77486L15.1688 0H13.7856L8.71722 5.8826L4.66907 0H0L6.12155 8.89546L0 16H1.38336L6.73581 9.78785L11.0109 16H15.68L9.33148 6.77486H9.33187H9.33161ZM7.43696 8.97374L6.81669 8.088L1.88171 1.03969H4.00634L7.98902 6.72789L8.60929 7.61362L13.7863 15.0074H11.6616L7.43709 8.974V8.97361L7.43696 8.97374Z" fill="currentColor" />
                           </svg>
                        </Link>
                        <Link to="#">
                           <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5C0 12.7426 3.10833 16.2591 7.17188 16.8967V10.957H5.01367V8.5H7.17188V6.62734C7.17188 4.49703 8.44087 3.32031 10.3825 3.32031C11.3124 3.32031 12.2852 3.48633 12.2852 3.48633V5.57813H11.2133C10.1574 5.57813 9.82812 6.23334 9.82812 6.90554V8.5H12.1855L11.8087 10.957H9.82812V16.8967C13.8917 16.2591 17 12.7426 17 8.5Z" fill="currentColor" />
                           </svg>
                        </Link>
                        <Link to="#">
                           <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.2579 4.7373C11.5141 4.7373 12.7188 5.23632 13.6071 6.12458C14.4954 7.01283 14.9944 8.21757 14.9944 9.47375V14.9996H11.8367V9.47375C11.8367 9.05502 11.6704 8.65344 11.3743 8.35736C11.0782 8.06127 10.6767 7.89493 10.2579 7.89493C9.8392 7.89493 9.43762 8.06127 9.14154 8.35736C8.84545 8.65344 8.67911 9.05502 8.67911 9.47375V14.9996H5.52148V9.47375C5.52148 8.21757 6.0205 7.01283 6.90876 6.12458C7.79701 5.23632 9.00174 4.7373 10.2579 4.7373Z" fill="currentColor" />
                              <path d="M3.15763 5.52734H0V15.0002H3.15763V5.52734Z" fill="currentColor" />
                              <path d="M1.57881 3.15763C2.45077 3.15763 3.15763 2.45077 3.15763 1.57881C3.15763 0.706859 2.45077 0 1.57881 0C0.706859 0 0 0.706859 0 1.57881C0 2.45077 0.706859 3.15763 1.57881 3.15763Z" fill="currentColor" />
                           </svg>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TeamDetails
