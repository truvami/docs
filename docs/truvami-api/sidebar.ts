import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "truvami-api/truvami-api",
    },
    {
      type: "category",
      label: "customers",
      items: [
        {
          type: "doc",
          id: "truvami-api/list-customers",
          label: "Get all customers.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "truvami-api/create-customer",
          label: "Create a new customer.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "truvami-api/delete-customer",
          label: "Delete customer by UUID.",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "truvami-api/get-customer",
          label: "Get customer by UUID.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "truvami-api/update-customer",
          label: "Update customer by UUID.",
          className: "api-method put",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
