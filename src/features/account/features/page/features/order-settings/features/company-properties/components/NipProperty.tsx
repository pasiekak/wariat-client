import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "react-bootstrap/Button";
import "../styles/nip-property.css";
import { AccountContext } from "../../../../../../../context/AccountContext";
import { isNIPValid } from "../../../../../../../../../utils/nip";
import axios from "axios";
import BannerPortal from "../../../../../../../../message-banner/BannerPortal";
import { IBannerPortalForwardedFunctions } from "../../../../../../../../message-banner/types/IBannerPortalForwardedFunctions";
import { ICompanyData } from "../../../../../../../../../api/types/ICompanyData";

const schema = yup.object({
  nip: yup
    .string()
    .required("nip-required")
    .matches(/^\d{10}$/, "nip-digits"),
});

const NipProperty = () => {
  const { companyData, user, setCompanyData } = useContext(AccountContext);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nip: companyData?.nip ? companyData.nip : "",
    },
    resolver: yupResolver(schema),
  });
  const ref = useRef<IBannerPortalForwardedFunctions>(null);
  const { t: tCom } = useTranslation(undefined, {
    keyPrefix:
      "components.account.order-settings.delivery-or-company-properties",
  });
  const { t: tAcc } = useTranslation(undefined, {
    keyPrefix: "components.account",
  });

  const [showEditor, setShowEditor] = useState(false);

  const onSubmit = (data: { nip: string }) => {
    if (isNIPValid(data.nip)) {
      clearErrors("nip");
      if (user?.id) {
        axios
          .put(`/api/companyData/users/${user.id}`, data)
          .then((res) => {
            if (res.status === 204) {
              setCompanyData((prev) => {
                if (prev) {
                  return { ...prev, nip: data.nip };
                }
                return prev;
              });
              if (ref.current)
                ref.current.addBanner({
                  type: "success",
                  message: tCom("success-upload-nip"),
                });
            } else if (res.status === 200) {
              if (ref.current)
                ref.current.addBanner({
                  type: "info",
                  message: tCom("success-set-but-same-values"),
                });
            } else {
              if (ref.current) {
                ref.current.addBanner({
                  type: "error",
                  message: tCom("failed-to-set-nip"),
                });
              }
            }
          })
          .catch((err) => {
            if (ref.current)
              ref.current.addBanner({
                type: "error",
                message: tCom("nip-error"),
              });
          });
      }
    } else {
      setError("nip", { type: "valid", message: "nip-invalid" });
    }
  };

  const loadCompanyDataFromApi = (nip: string) => {
    if (isNIPValid(nip)) {
      axios
        .get(`/api/companyData/byNip/${nip}`)
        .then((res) => {
          if (res.status === 200) {
            let updateBody = {
              nip: res.data.companyNip,
              companyName: res.data.companyName,
              city: res.data.companyCity,
              street: res.data.companyStreet,
              postalCode: res.data.companyPostalCode,
              country: res.data.companyCountry,
              buildingNumber: res.data.companyBuildingNumber,
            };
            if (user?.id) {
              axios
                .put(`/api/companyData/users/${user.id}`, updateBody)
                .then((res) => {
                  if (res.status === 204) {
                    setCompanyData(updateBody as ICompanyData);
                    if (ref.current)
                      ref.current.addBanner({
                        type: "success",
                        message: tCom("success-upload-nip"),
                      });
                  } else if (res.status === 200) {
                    if (ref.current)
                      ref.current.addBanner({
                        type: "info",
                        message: tCom("success-but-same-values"),
                      });
                  }
                })
                .catch((err) => {
                  if (ref.current)
                    ref.current.addBanner({
                      type: "error",
                      message: tCom("nip-error"),
                    });
                });
            }
          }
        })
        .catch((err) => {
          if (ref.current)
            ref.current.addBanner({
              type: "error",
              message: tCom("nip-error"),
            });
        });
    }
  };

  return (
    <div className="single-db-property nip">
      <span className="label">{tCom("nip")}</span>
      {showEditor ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="dark"
            onClick={() => {
              setShowEditor(false);
            }}
          >
            {tAcc("go-back-button")}
          </Button>
          <input type="text" required {...register("nip")} />
          <Button type="submit" variant="dark">
            {tAcc("confirm-button")}
          </Button>
          <Button
            variant="outline-dark"
            disabled={!isNIPValid(watch("nip"))}
            onClick={() => loadCompanyDataFromApi(watch("nip"))}
          >
            {tAcc("upload-company-data")}
          </Button>
          <span className="error">
            {errors.nip?.message && tCom(errors.nip.message)}
          </span>
        </form>
      ) : (
        <>
          <span className="value">
            {companyData?.nip
              ? companyData.nip
              : tAcc("empty-property-message")}
          </span>
          <Button variant="outline-dark" onClick={() => setShowEditor(true)}>
            {tAcc("change-button")}
          </Button>
        </>
      )}
      <BannerPortal ref={ref} autoClose={true} autoCloseTime={10000} />
    </div>
  );
};
export default NipProperty;
