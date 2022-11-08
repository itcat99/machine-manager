/** 分类结构 */
declare interface CategoryI extends Record<string, any> {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 编码 */
  code: string;
  /** 描述 */
  description: string | null;
  /** 层级 */
  level: number;
  /** 子集 */
  children?: CategoryI[];
}

/** 参数组结构 */
declare interface ParamGroupI extends Record<string, any> {
  "->param": any[];
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 顺序 */
  position: number;
}

/** 参数结构 */
declare interface ParamI {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 参数组 */
  param_group: ParamGroupI;
  /** 顺序 */
  position: number;
  /** 别名 */
  aliases?: string[];
  /** 单位 */
  unit?: string;
}

/** 产品模板结构 */
declare interface ProductSpecI extends Record<string, any> {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 分类 */
  category: CategoryI;
  /** 参数列表 */
  params: (ParamI & { param_group: string })[];
}

declare interface ParamByProductI {
  产品名称: string | null;
  产品图片: string | null;
  产品系列: string | null;
  产品编码: string | null;
  产品颜色: string | null;
  功率: string | null;
  动力: string | null;
  压力Mpa: string | null;
  品牌: string | null;
  备注: string | null;
  宽mm: string | null;
  气量: string | null;
  设备出厂时间: string | null;
  配套数量: string | null;
  配套设备品牌: string | null;
  配套设备型号: string | null;
  长mm: string | null;
  高mm: string | null;
}

/** 产品详情结构 */
declare interface ProductI extends Record<string, any> {
  id: string;
  /** 产品规格 */
  product_spec: ProductSpecI & {
    category: string | null;
  };
  /** 参数值 */
  params: ParamByProductI;
}
