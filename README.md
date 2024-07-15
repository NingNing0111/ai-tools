# AI 工具集

## 一、代码模仿生成

&emsp;需求场景：

&emsp;我想将下述代码：

```ts
hourlyFlow.value.sq_over_1hour_top3_list = data.sq_over_1hour_top3_list;
hourlyFlow.value.sq_top1_hour_people_list = data.sq_top1_hour_people_list;
hourlyFlow.value.sq_top2_hour_people_list = data.sq_top2_hour_people_list;
hourlyFlow.value.sq_top3_hour_people_list = data.sq_top3_hour_people_list;
```

&emsp;修改为：

```ts
hourlyFlow.value.sq_over_1hour_top3_list = parseStringToList(
  data.sq_over_1hour_top3_list,
  "string"
);
hourlyFlow.value.sq_top1_hour_people_list = parseStringToList(
  data.sq_top1_hour_people_list,
  "string"
);
hourlyFlow.value.sq_top2_hour_people_list = parseStringToList(
  data.sq_top2_hour_people_list,
  "string"
);
hourlyFlow.value.sq_top3_hour_people_list = parseStringToList(
  data.sq_top3_hour_people_list,
  "string"
);
```

&emsp;如果是人工写，那么就需要给每一个对象的属性手动调一次`parseStringToList`方法,即使你可以 CV，但是，如果遇到下面这种情况，可能你就真的懒得想 CV 了。

```ts
trafficHubStayDuration.value.jtsn_jc_dur_people_num_list = parseStringToList(
  data.jtsn_jc_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_qg_dur_people_num_list = parseStringToList(
  data.jtsn_qg_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_hc_dur_people_num_list = parseStringToList(
  data.jtsn_hc_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_dt_dur_people_num_list = parseStringToList(
  data.jtsn_dt_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_qc_dur_people_num_list = parseStringToList(
  data.jtsn_qc_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_gssf_dur_people_num_list = parseStringToList(
  data.jtsn_gssf_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_gt_dur_people_num_list = parseStringToList(
  data.jtsn_gt_dur_people_num_list ?? [],
  "string"
);
trafficHubStayDuration.value.jtsn_gs_dur_people_num_list = parseStringToList(
  data.jtsn_gs_dur_people_num_list ?? [],
  "string"
);
```

&emsp;这个时候，你就需要用到代码模仿生成工具。只需提供代码示例说明，例如：

&emsp;旧代码：

```ts
dwellTime.value.sq_over_1hour_top3_ave_list = data.sq_over_1hour_top3_ave_list;
dwellTime.value.sq_top3_ave_dur_list = data.sq_top3_ave_dur_list;
```

&emsp;目标代码：

```ts
dwellTime.value.sq_over_1hour_top3_ave_list = parseStringToList(
  data.sq_over_1hour_top3_ave_list,
  "string"
);
dwellTime.value.sq_top3_ave_dur_list = parseStringToList(
  data.sq_top3_ave_dur_list,
  "number"
);
```

&emsp;说明描述：

```txt
对于数字列表，使用parseStringToList时指定number进行解析，
对于字符串列表,使用parseStringToList时指定string进行解析,
其它情况使用JSON.parse(data.属性)进行解析
```

&emsp;然后给出你的代码：

```ts
hourlyFlow.value.sq_over_1hour_top3_list = data.sq_over_1hour_top3_list;
hourlyFlow.value.sq_top1_hour_people_list = data.sq_top1_hour_people_list;
hourlyFlow.value.sq_top2_hour_people_list = data.sq_top2_hour_people_list;
hourlyFlow.value.sq_top3_hour_people_list = data.sq_top3_hour_people_list;
```

&emsp;再给出关于你的代码的描述信息

```txt
hourlyFlow的属性都是string列表
```

&emsp;点击生成，即可获取目标代码：

```ts
hourlyFlow.value.sq_over_1hour_top3_list = parseStringToList(
  data.sq_over_1hour_top3_list,
  "string"
);

hourlyFlow.value.sq_top1_hour_people_list = parseStringToList(
  data.sq_top1_hour_people_list,
  "string"
);

hourlyFlow.value.sq_top2_hour_people_list = parseStringToList(
  data.sq_top2_hour_people_list,
  "string"
);

hourlyFlow.value.sq_top3_hour_people_list = parseStringToList(
  data.sq_top3_hour_people_list,
  "string"
);
```
