import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { User } from '../users/domain/user';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { ApiResponseHelper, ApiResponse } from '../utils/api-response';
import { ApiResponseDto } from '../utils/dto/api-response.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @ApiOkResponse({
    description: 'Login successful',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    const loginData = await this.service.validateLogin(loginDto);
    return ApiResponseHelper.success(loginData, 'Login successful');
  }

  @Post('email/register')
  @ApiOkResponse({
    description: 'Registration successful',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<ApiResponse<null>> {
    await this.service.register(createUserDto);
    return ApiResponseHelper.success(null, 'Registration successful');
  }

  @Post('email/confirm')
  @ApiOkResponse({
    description: 'Email confirmed successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<ApiResponse<null>> {
    await this.service.confirmEmail(confirmEmailDto.hash);
    return ApiResponseHelper.success(null, 'Email confirmed successfully');
  }

  @Post('email/confirm/new')
  @ApiOkResponse({
    description: 'New email confirmed successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async confirmNewEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<ApiResponse<null>> {
    await this.service.confirmNewEmail(confirmEmailDto.hash);
    return ApiResponseHelper.success(null, 'New email confirmed successfully');
  }

  @Post('forgot/password')
  @ApiOkResponse({
    description: 'Password reset email sent successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<ApiResponse<null>> {
    await this.service.forgotPassword(forgotPasswordDto.email);
    return ApiResponseHelper.success(
      null,
      'Password reset email sent successfully',
    );
  }

  @Post('reset/password')
  @ApiOkResponse({
    description: 'Password reset successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordDto: AuthResetPasswordDto,
  ): Promise<ApiResponse<null>> {
    await this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
    return ApiResponseHelper.success(null, 'Password reset successfully');
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'User profile retrieved successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async me(
    @Request() request,
  ): Promise<ApiResponse<NullableType<User>>> {
    const user = await this.service.me(request.user);
    return ApiResponseHelper.success(
      user,
      'User profile retrieved successfully',
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Token refreshed successfully',
    type: ApiResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @Request() request,
  ): Promise<ApiResponse<RefreshResponseDto>> {
    const refreshData = await this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
    return ApiResponseHelper.success(
      refreshData,
      'Token refreshed successfully',
    );
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Logout successful',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async logout(@Request() request): Promise<ApiResponse<null>> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
    return ApiResponseHelper.success(null, 'Logout successful');
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Profile updated successfully',
    type: ApiResponseDto,
  })
  public async update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<ApiResponse<NullableType<User>>> {
    const user = await this.service.update(request.user, userDto);
    return ApiResponseHelper.success(user, 'Profile updated successfully');
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Account deleted successfully',
    type: ApiResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public async delete(@Request() request): Promise<ApiResponse<null>> {
    await this.service.softDelete(request.user);
    return ApiResponseHelper.success(null, 'Account deleted successfully');
  }
}
