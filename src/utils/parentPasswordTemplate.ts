export const getEmailBody = (email: any) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      dir="ltr"
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      lang="en"
      style="padding: 0; margin: 0"
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>Konsis Group - ${email.emailTitle}</title>
      
      </head>
      <body
        data-new-gr-c-s-loaded="14.1157.0"
        style="
          width: 100%;
          font-family: arial, 'helvetica neue', helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
      >
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
      <tbody>
        <tr>
          <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                      <tbody>
                        <tr>
                          <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                        </tr>
                        <tr>
                        </tr>
                       
                        <tr>
                          <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">${email.emailTitle}</h2>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">${email.text}!</h4>
                          </td>
                        </tr>
                     
                              </tbody>
                            </table>
                          </td>
                        </tr>
                       
                      </tbody>
                    </table>
                    
                  </td>
                </tr>
              </tbody>
            </table>
       
                  </td>
                </tr>
             
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      </body>
    </html>
    
      `;
  };
  