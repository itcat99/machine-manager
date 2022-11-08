/** 用户结构 */
declare interface UserI {
  /** ID */
  id: string;
  /** 手机号 */
  telephone: string;
  /** 电子邮箱 */
  email: string;
  /** 加密后的密码 */
  password_encrypted: string;
  /** 加密所用的盐 */
  salt: string;
  /** 状态 */
  status: string;
  /** 所属企业 */
  corp: any;
  /** 角色 */
  roles: string[];
  /** 身份证号码 */
  idcard: string;
  /** 身份证姓名 */
  name: string;
}
