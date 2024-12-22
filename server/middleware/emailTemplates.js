exports.welcomeEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Goldwin Adverts!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .welcome-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Welcome to Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Welcome back, {name}.</p>
        <p>
          We’re thrilled to have you join us! Your registration was successful,
          and we’re committed to providing you with the best experience
          possible.
        </p>
        <p>Here’s how you can get started:</p>
        <ul>
          <li>Explore our features and customize your experience.</li>
          <li>
            Reach out to our support team if you have any questions or need
            assistance.
          </li>
        </ul>
        <p>This is an automated message, please do not reply.</p>
        <a href="http://localhost:3000" class="button">
          Get Started
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.resetEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset password!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>We received a request to reset your password.</p>
        <p>
        Click the button below to set a new password for your account. If you
        did not request to reset your password, please ignore this email.
        </p>
        <a href="{reset url}" class="button">
          Reset Password
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.tokenEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Token received!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>You received {code} Code.</p>
        <p>
        Congratulations! We have approved your Agent Code. Your Premium code is
        {secret}. This one-time-use token unlocks premium earning opportunities with Goldwin Adverts, bringing you closer to maximizing your rewards.
        </p>
        <p>
        NB: Don't miss out! Redeem your cashback before the week ends, or it will be cleared. Take action now and boost your earnings. Happy profits!
        </p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.agentTokenEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You received premium code profit!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>You received 75% premium code profit.</p>
        <p>
        Congratulations, agent {name}! Your hard work with Goldwin Adverts has earned you a 75% profit on the {code} Token, worth KES {commission}. Keep promoting our brand for a chance to win big cashbacks in the next round. Happy profits!
        </p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
        </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.packageEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Package received!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>You received {package} package.</p>
        <p>
        Congratulations! We have approved your {package} package and granted you the ability to advertise and submit our daily products.
        </p>
        <p>
        NB: Don't miss out! Redeem your cashback before the week ends, or it will be cleared. Take action now and boost your earnings. Happy profits!
        </p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.agentPackageEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You received package profit!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>You received 85% package profit.</p>
        <p>
        Congratulations, agent {name}! Your hard work with Goldwin Adverts has earned you a 85% profit on the package, worth KES {commission}. Keep promoting our brand for a chance to win big cashbacks in the next round. Happy profits!
        </p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
        </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.agentCashbackEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You received Cashback profit!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .reset-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="welcome-message">Dear, {name}.</p>
        <p>You received 66% Cashback profit.</p>
        <p>
        Congratulations, agent {name}! Your hard work with Goldwin Adverts has earned you a 66% profit on Cashback Redemption, worth KES {commission}. Keep promoting our brand for a chance to win big cashbacks in the next round. Happy profits!
        </p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
        </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.whatsappEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Submit success!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .whatsapp-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="whatsapp-message">Dear, {name}.</p>
        <p>
          Congratulations! Your views submission request has been successfully approved. 
          Goldwin Adverts has been credited KES {amount} to your account. You may withdraw. Happy profits!
        </p>
        <p>This is an automated message, please do not reply.</p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

exports.withdrawEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Withdrwal success!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
      }

      .header {
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .withdraw-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .link {
        color: green !important;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="withdraw-message">Dear, {name}.</p>
        <p>
          Congratulations! You've successfully withdrawn Funds worth KES {amount}.00.
          Please confirm your M-Pesa Account. Happy profits!
        </p>
        <p>
          If you don't recognize this activity please
          <a href="http://localhost:3000/reset-password" class="link">Reset Password</a> or
          <a href="http://localhost:3000/contact-us" class="link">Contact Support</a>
          immediately.
        </p>
        <p>This is an automated message, please do not reply.</p>
        <a href="http://localhost:3000" class="button">
          Visit Dashboard
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>

`;

exports.clientEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Customer support!</title>
    <style>
      body {
        font-family: system-ui, Segoe UI, sans-serif, color-emoji;
        font-style: normal;
        margin: 0;
        padding: 0;
        background-color: white;
        color: black;
      }

      .container {
        max-width: 600px;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        overflow: hidden;
        border: 1px solid #d9e7e2;
        padding: 0px;
      }

      .header{
        background-color: rgb(34, 197, 94, 1);
        color: white;
        padding: 18px;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .content {
        padding: 25px;
        line-height: 1.8;
      }

      .client-message {
        font-size: 18px;
        margin: 20px 0;
      }

      .button {
        padding: 8px 20px;
        margin: 20px 0;
        background-color: rgb(239, 68, 68, 1);
        color: white !important;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        transition: background-color 0.3s;
        border-radius: 10px;
        border: 0px;
        text-decoration-style: none;
      }

      .button:hover {
        background-color: red;
        color: white !important;
        cursor: pointer;
      }

      .footer {
        text-align: center;
      }

      p {
        margin: 0 0 15px;
      }
    </style>
  </head>

  <body>
    <div class="container">
    <div class="header">Goldwin Adverts</div>
      <div class="content">
        <p class="client-message">Client: {name},</p>
        <p>{message}</p>        
        <a href="http://localhost:3000" class="button">
          Go to Homepage
        </a>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goldwin Adverts. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>

`;
