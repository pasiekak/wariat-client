import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { isValidNip } from "../../../account/features/page/features/order-settings/features/company-properties/components/NipProperty";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./styles/receiver-data.css";

import PhoneInput from "react-phone-number-input/react-hook-form";
import accountActions from "../../../../api/accountActions";

const ReceiverData = ({
  dispatch,
  prepareOrder,
  needAddress,
  user,
  address,
  personalData,
  companyData,
  loading,
}) => {
  const { t } = useTranslation(null, {
    keyPrefix: "components.order.receiver-data",
  });
  const sessionOrder =
    JSON.parse(sessionStorage.getItem("order-before-submission")) || null;
  const [nipLoading, setNipLoading] = useState(false);
  const [nipReqCount, setNipReqCount] = useState(0);
  const [isNipButtonDisabled, setIsNipButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // receiver personal data
      email: sessionOrder?.email || user?.email || "",
      firstName: sessionOrder?.firstName || personalData?.firstName || "",
      lastName: sessionOrder?.lastName || personalData?.lastName || "",
      phone: sessionOrder?.phone || personalData?.phone || "",
      // delivery address
      country: sessionOrder?.deliveryAddress?.country || address?.country || "",
      city: sessionOrder?.deliveryAddress?.city || address?.city || "",
      postalCode:
        sessionOrder?.deliveryAddress?.postalCode || address?.postalCode || "",
      street: sessionOrder?.deliveryAddress?.street || address?.street || "",
      homeNumber:
        sessionOrder?.deliveryAddress?.homeNumber || address?.homeNumber || "",
      // company data
      wantInvoice: false,
      companyNip: sessionOrder?.invoiceDetails?.nip || companyData?.nip || "",
      companyName:
        sessionOrder?.invoiceDetails?.companyName ||
        companyData?.companyName ||
        "",
      companyCountry:
        sessionOrder?.invoiceDetails?.country || companyData?.country || "",
      companyCity:
        sessionOrder?.invoiceDetails?.city || companyData?.city || "",
      companyPostalCode:
        sessionOrder?.invoiceDetails?.postalCode ||
        companyData?.postalCode ||
        "",
      companyStreet:
        sessionOrder?.invoiceDetails?.street || companyData?.street || "",
      companyBuildingNumber:
        sessionOrder?.invoiceDetails?.buildingNumber ||
        companyData?.buildingNumber ||
        "",
    },
  });

  let wantInvoiceInput = watch("wantInvoice");
  let nipInput = watch("companyNip");

  useEffect(() => {
    let timer;
    if (nipReqCount >= 5) {
      setIsNipButtonDisabled(true);
      timer = setTimeout(() => {
        setIsNipButtonDisabled(false);
        setNipReqCount(0);
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [nipReqCount]);

  useEffect(() => {
    if (wantInvoiceInput) {
      if (!isValidNip(nipInput)) {
        setError("nip", {
          type: "valid",
          message: t("form.nip-invalid"),
        });
      } else {
        clearErrors("nip");
      }
    } else {
      clearErrors("nip");
    }
  }, [nipInput, wantInvoiceInput, clearErrors, setError, t]);

  const onSubmit = (data) => {
    prepareOrder(data);
  };

  const loadCompanyDataFromApi = () => {
    let nip = watch("companyNip");
    if (!isValidNip(nip)) {
      setError("nip", {
        type: "valid",
        message: t("form.nip-invalid"),
      });
    } else {
      clearErrors(["nip", "load"]);
      setNipLoading(true);
      accountActions.companyData.getDataByNIP(nip).then((res) => {
        if (res.success) {
          setNipReqCount((prev) => prev + 1);
          setNipLoading(false);
          // Pobrane dane z CEIDG
          const ceidgData = res.data;
          // Ustawienie pobranych danych jako defaultValues
          Object.keys(ceidgData).forEach((key) => {
            setValue(key, ceidgData[key]);
          });
        } else {
          setNipLoading(false);
          setError("nip", {
            type: "load",
            message: t("form.unable-to-load-nip"),
          });
        }
      });
    }
  };

  return (
    <div className="ReceiverData Order bck-smooth">
      <div
        className="order-wrapper"
        style={{
          alignItems: loading && "center",
          justifyContent: loading && "center",
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h4 className="title">{t("title")}</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h5>{t("personal-data-title")}</h5>
              <div className="personal-data-wrapper">
                <Form.Group controlId="formFirstName">
                  <Form.Label>{t("form.first-name-label")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("form.first-name-placeholder")}
                    {...register("firstName", {
                      required: t("form.first-name-required"),
                    })}
                  />
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>{t("form.last-name-label")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("form.last-name-placeholder")}
                    {...register("lastName", {
                      required: t("form.last-name-required"),
                    })}
                  />
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>{t("form.phone-label")}</Form.Label>
                  <PhoneInput
                    name="phone"
                    control={control}
                    rules={{ required: t("form.phone-required") }}
                  />
                  {errors.phone && <span>{errors.phone.message}</span>}
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>{t("form.email-label")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("form.email-placeholder")}
                    {...register("email", {
                      required: t("form.email-required"),
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </Form.Group>
              </div>

              {needAddress && (
                <>
                  <h5>{t("shipment-data-title")}</h5>
                  <div className="delivery-address-wrapper">
                    <Form.Group controlId="formCountry">
                      <Form.Label>{t("form.country-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.country-placeholder")}
                        {...register("country", {
                          required: t("form.country-required"),
                        })}
                      />
                      {errors.country && <span>{errors.country.message}</span>}
                    </Form.Group>
                    <Form.Group controlId="formCity">
                      <Form.Label>{t("form.city-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.city-placeholder")}
                        {...register("city", {
                          required: t("form.city-required"),
                        })}
                      />
                      {errors.city && <span>{errors.city.message}</span>}
                    </Form.Group>
                    <Form.Group controlId="formPostalCode">
                      <Form.Label>{t("form.postal-code-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.postal-code-placeholder")}
                        {...register("postalCode", {
                          required: t("form.postal-code-required"),
                        })}
                      />
                      {errors.postalCode && (
                        <span>{errors.postalCode.message}</span>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formStreet">
                      <Form.Label>{t("form.street-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.street-placeholder")}
                        {...register("street", {
                          required: t("form.street-required"),
                        })}
                      />
                      {errors.street && <span>{errors.street.message}</span>}
                    </Form.Group>
                    <Form.Group controlId="formHomeNumber">
                      <Form.Label>{t("form.home-number-label")}</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t("form.home-number-placeholder")}
                        {...register("homeNumber", {
                          required: t("form.home-number-required"),
                        })}
                      />
                      {errors.homeNumber && (
                        <span>{errors.homeNumber.message}</span>
                      )}
                    </Form.Group>
                  </div>
                </>
              )}
              <Form.Group controlId="formWantInvoice">
                <Form.Check
                  type="checkbox"
                  label={t("form.want-invoice-label")}
                  {...register("wantInvoice")}
                />
              </Form.Group>
              {watch("wantInvoice") && (
                <>
                  <h5>{t("company-data-title")}</h5>
                  <div className="company-data-wrapper">
                    <div className="nip-wrapper">
                      <Form.Group controlId="formNip">
                        <Form.Label>{t("form.nip-label")}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={t("form.nip-placeholder")}
                          maxLength="10"
                          {...register("companyNip", {
                            required: t("form.nip-required"),
                          })}
                        />
                        {errors.nip && <span>{errors.nip.message}</span>}
                      </Form.Group>
                      <Button
                        disabled={isNipButtonDisabled}
                        onClick={() => loadCompanyDataFromApi()}
                      >
                        {nipLoading ? (
                          <Spinner />
                        ) : isNipButtonDisabled ? (
                          t("form.too-much-requests")
                        ) : (
                          t("form.load-nip-data")
                        )}
                      </Button>
                    </div>
                    <Form.Group controlId="formCompanyName">
                      <Form.Label>{t("form.company-name-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.company-name-placeholder")}
                        {...register("companyName", {
                          required: t("form.company-name-required"),
                        })}
                      />
                      {errors.companyName && (
                        <span>{errors.companyName.message}</span>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formCountry">
                      <Form.Label>{t("form.country-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.country-placeholder")}
                        {...register("companyCountry", {
                          required: t("form.country-required"),
                        })}
                      />
                      {errors.companyCountry && (
                        <span>{errors.companyCountry.message}</span>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formCity">
                      <Form.Label>{t("form.city-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.city-placeholder")}
                        {...register("companyCity", {
                          required: t("form.city-required"),
                        })}
                      />
                      {errors.companyCity && (
                        <span>{errors.companyCity.message}</span>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formPostalCode">
                      <Form.Label>{t("form.postal-code-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.postal-code-placeholder")}
                        {...register("companyPostalCode", {
                          required: t("form.postal-code-required"),
                        })}
                      />
                      {errors.companyPostalCode && (
                        <span>{errors.companyPostalCode.message}</span>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formStreet">
                      <Form.Label>{t("form.street-label")}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("form.street-placeholder")}
                        {...register("companyStreet", {
                          required: t("form.street-required"),
                        })}
                      />
                      {errors.companyStreet && (
                        <span>{errors.companyStreet.message}</span>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formBuildingNumber">
                      <Form.Label>{t("form.building-number-label")}</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t("form.building-number-placeholder")}
                        {...register("companyBuildingNumber", {
                          required: t("form.building-number-required"),
                        })}
                      />
                      {errors.companyBuildingNumber && (
                        <span>{errors.companyBuildingNumber.message}</span>
                      )}
                    </Form.Group>
                  </div>
                </>
              )}

              <div className="buttons">
                <Button
                  variant="outline-success"
                  onClick={() => dispatch({ type: "dec" })}
                >
                  {t("form.back-to-delivery-type-button")}
                </Button>
                <Button variant="success" type="submit">
                  {t("form.move-to-summary-button")}
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiverData;
