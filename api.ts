import Surreal from "surrealdb.js";

const db = new Surreal("http://124.70.69.38:8000/rpc");

/** TYPES */

/** 分类结构 */
export interface CategoryI extends Record<string, any> {
  description: string | null;
  id: string;
  level: number;
  name: string;
}

/** 参数组结构 */
export interface ParamGroupI extends Record<string, any> {
  "->param": any[];
  id: string;
  name: string;
  position: number;
}

/** 参数结构 */
export interface ParamI {
  id: string;
  name: string;
  param_group: string;
  position: number;
  aliases?: string[];
}

/** 产品模板结构 */
export interface ProductSpecI extends Record<string, any> {
  category: CategoryI;
  id: string;
  name: string;
  params: ParamI[];
}

/** 产品详情结构 */
export interface ProductI extends Record<string, any> {
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

  /** 产品模板 */
  product_spec: {
    category: string | null;
    id: string;
    name: string;
  };

  params: ParamI[];
}

interface ToIdInObjI {
  [key: string]: any;
}

/** TYPES END */

function to_id(id: string, type: string) {
  if (id.startsWith(`${type}:`)) {
    return id;
  }
  return `${type}:⟨${id}⟩`;
}

function to_id_in(object: ToIdInObjI, key: string, type: string) {
  let value = object[key];
  if (value) {
    if (Array.isArray(value)) {
      let arr = [];
      for (let v of value) {
        arr.push(to_id(v, type));
      }
      object[key] = arr;
    } else {
      object[key] = to_id(value, type);
    }
  }
}

export class MtoolClient {
  public ns: string;
  public db: string;

  constructor() {
    this.ns = "test";
    this.db = "test";
    // this.sc = "user";
  }
  async login(user: string, pass: string) {
    await db.signin({
      // NS: this.ns,
      // DB: this.db,
      // SC: this.src,
      user,
      pass,
    });
    await db.use(this.ns, this.db);
    return;
  }
  /* 
    let category = {
        id: "E020502",
        name: "肥皂及合成洗涤剂",
        level: 3,
        description: null,
    }
    */
  async createCategoryOne(category: CategoryI) {
    return await db.create(to_id(category.id, "category"), category);
  }
  async updateCategoryOne(id: string, category: CategoryI) {
    return await db.update(to_id(id, "category"), category);
  }
  async changeCategoryOne(id: string, category: CategoryI) {
    return await db.change(to_id(id, "category"), category);
  }
  async deleteCategoryOne(id: string) {
    return await db.delete(to_id(id, "category"));
  }
  async deleteCategoryAll() {
    return await db.delete(`category`);
  }
  /*
    返回值：
    [
    {
        "id": "category:E020502",
        "name": "肥皂及合成洗涤剂",
        "level": 3,
        "description": null
    },...
    ]
*/
  async selectCategoryAll() {
    return (await db.query(`select * from category`))[0].result as CategoryI[];
  }

  //---------------------------------------------------------
  /*
    let id = "整机信息";
    let Group = {position: 0};
    */
  async createParamGroupOne(id: string, paramGroup: ParamGroupI) {
    return await db.create(to_id(id, "param_group"), paramGroup);
  }
  async updateParamGroupOne(id: string, paramGroup: ParamGroupI) {
    return await db.update(to_id(id, "param_group"), paramGroup);
  }
  async changeParamGroupOne(id: string, paramGroup: ParamGroupI) {
    return await db.change(to_id(id, "param_group"), paramGroup);
  }
  async deleteParamGroupOne(id: string) {
    return await db.delete(to_id(id, "param_group"));
  }
  async deleteParamGroupAll() {
    return await db.delete(`param_group`);
  }
  //todo!
  async selectParamGroupAll() {
    return (await db.query(`select *, ->param from param_group`))[0]
      .result as ParamGroupI[];
  }

  //---------------------------------------------------------
  /*
    let id = "长mm";
    let param = {param_group: "配件技术参数", unit: "mm", position: 18};
    */
  async createParamOne(id: string, param: ToIdInObjI) {
    to_id_in(param, "param_group", "param_group");
    return await db.create(to_id(id, "param"), param);
  }
  async updateParamOne(id: string, param: ToIdInObjI) {
    to_id_in(param, "param_group", "param_group");
    return await db.update(to_id(id, "param"), param);
  }
  async changeParamOne(id: string, param: ToIdInObjI) {
    to_id_in(param, "param_group", "param_group");
    return await db.change(to_id(id, "param"), param);
  }
  async deleteParamOne(id: string) {
    return await db.delete(to_id(id, "param"));
  }
  async deleteParamAll() {
    return await db.delete(`param`);
  }

  async selectParamOne(id: string) {
    id = to_id(id, "param");
    return (await db.query<any[]>(`select * from ${id} fetch param_group`))[0]
      .result[0] as ParamI;
  }
  async selectParamAll() {
    return (await db.query(`select * from param fetch param_group`))[0]
      .result as ParamI[];
  }

  //---------------------------------------------------------
  /*
    let id = "进气阀";
    let param = {category: "01020902", params: ["动力", "配套设备品牌"]};
    */
  async createProductSpecOne(id: string, productSpec: ProductSpecI) {
    to_id_in(productSpec, "category", "category");
    to_id_in(productSpec, "params", "param");
    return await db.create(to_id(id, "product_spec"), productSpec);
  }
  async updateProductSpecOne(id: string, productSpec: ProductSpecI) {
    to_id_in(productSpec, "category", "category");
    to_id_in(productSpec, "params", "param");
    return await db.update(to_id(id, "product_spec"), productSpec);
  }
  async changeProductSpecOne(id: string, productSpec: ProductSpecI) {
    to_id_in(productSpec, "category", "category");
    to_id_in(productSpec, "params", "param");
    return await db.change(to_id(id, "product_spec"), productSpec);
  }
  async deleteProductSpecOne(id: string) {
    return await db.delete(to_id(id, "product_spec"));
  }
  async deleteProductSpecAll() {
    return await db.delete(`product_spec`);
  }

  async selectProductSpecOne(id: string) {
    id = to_id(id, "product_spec");
    return (
      await db.query<any[]>(`select * from ${id} fetch category, params`)
    )[0].result[0] as ProductSpecI;
  }
  async selectProductSpecAll() {
    return (
      await db.query(`select * from product_spec fetch category, params`)
    )[0].result as ProductSpecI[];
  }
  async selectProductSpecByCategory(category: string) {
    category = to_id(category, "category");
    return (
      await db.query(
        `select * from product_spec where category=${category} fetch category, params `
      )
    )[0].result as ProductSpecI[];
  }

  //---------------------------------------------------------
  // product
  /*
    let product = {product_spec: "电力元件及器材", params: {
        "产品名称": "交流接触器",
        "产品图片": null,
        "产品型号": "JNF2DH"
      }
    };
    */
  async createProductOne(product: ProductI) {
    to_id_in(product, "product_spec", "product_spec");
    // 注：返回的数据里，包含了新创建的产品的id
    return await db.create("product", product);
  }
  async updateProductOne(id: string, product: ProductI) {
    to_id_in(product, "product_spec", "product_spec");
    return await db.update(to_id(id, "product"), product);
  }
  async changeProductOne(id: string, product: ProductI) {
    to_id_in(product, "product_spec", "product_spec");
    return await db.change(to_id(id, "product"), product);
  }
  async deleteProductOne(id: string) {
    return await db.delete(to_id(id, "product"));
  }
  async deleteProductAll() {
    return await db.delete(`product`);
  }
  async deleteProductBySpec(product_spec: string) {
    product_spec = to_id(product_spec, "product_spec");
    return await db.query(
      `delete * from product where product_spec=${product_spec}`
    );
  }

  async selectProductOne(id: string) {
    id = to_id(id, "product");
    return (await db.query<any[]>(`select * from ${id} fetch product_spec`))[0]
      .result[0] as ProductI;
  }
  async selectProductAll() {
    return (
      await db.query(
        `select * from product fetch product_spec, product_spec.params`
      )
    )[0].result as ProductI[];
  }
  async selectProductBySpec(product_spec: string) {
    product_spec = to_id(product_spec, "product_spec");
    return (
      await db.query(
        `select * from product where product_spec=${product_spec} fetch product_spec, product_spec.params`
      )
    )[0].result as ProductSpecI;
  }
}

export const api = new MtoolClient();
