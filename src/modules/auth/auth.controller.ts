import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PREFIXES } from '../../mok/prefixes.mok';
import { RESPONSE_MESSAGES } from '../../mok/auth.mok';

@Controller(PREFIXES.AUTH)
export class AuthController {
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth Callback' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: RESPONSE_MESSAGES.SUCCESSFULLY_AUTHENTICATED,
  })
  googleAuthRedirect(@Req() req) {
    const data = {
      user: req.user.user,
      jwt: req.user.jwt,
    };
    return `
    <html>
      <body>
        <script>
          window.opener.postMessage(${JSON.stringify(data)}, "${
      process.env.FRONTEND_URL
    }");
          window.close();
        </script>
      </body>
    </html>
  `;
  }

  @Post('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth Callback' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authenticated.',
  })
  googleAuthCallback(@Req() req) {
    console.log('In');
    return { user: req.user.user, jwt: req.user.jwt };
  }
}
