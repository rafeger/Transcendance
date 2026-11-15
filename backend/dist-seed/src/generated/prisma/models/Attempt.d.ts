import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AttemptModel = runtime.Types.Result.DefaultSelection<Prisma.$AttemptPayload>;
export type AggregateAttempt = {
    _count: AttemptCountAggregateOutputType | null;
    _avg: AttemptAvgAggregateOutputType | null;
    _sum: AttemptSumAggregateOutputType | null;
    _min: AttemptMinAggregateOutputType | null;
    _max: AttemptMaxAggregateOutputType | null;
};
export type AttemptAvgAggregateOutputType = {
    id: number | null;
    score: number | null;
    userId: number | null;
    quizId: number | null;
};
export type AttemptSumAggregateOutputType = {
    id: number | null;
    score: number | null;
    userId: number | null;
    quizId: number | null;
};
export type AttemptMinAggregateOutputType = {
    id: number | null;
    score: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    userId: number | null;
    quizId: number | null;
};
export type AttemptMaxAggregateOutputType = {
    id: number | null;
    score: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    userId: number | null;
    quizId: number | null;
};
export type AttemptCountAggregateOutputType = {
    id: number;
    score: number;
    startedAt: number;
    finishedAt: number;
    userId: number;
    quizId: number;
    _all: number;
};
export type AttemptAvgAggregateInputType = {
    id?: true;
    score?: true;
    userId?: true;
    quizId?: true;
};
export type AttemptSumAggregateInputType = {
    id?: true;
    score?: true;
    userId?: true;
    quizId?: true;
};
export type AttemptMinAggregateInputType = {
    id?: true;
    score?: true;
    startedAt?: true;
    finishedAt?: true;
    userId?: true;
    quizId?: true;
};
export type AttemptMaxAggregateInputType = {
    id?: true;
    score?: true;
    startedAt?: true;
    finishedAt?: true;
    userId?: true;
    quizId?: true;
};
export type AttemptCountAggregateInputType = {
    id?: true;
    score?: true;
    startedAt?: true;
    finishedAt?: true;
    userId?: true;
    quizId?: true;
    _all?: true;
};
export type AttemptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttemptCountAggregateInputType;
    _avg?: AttemptAvgAggregateInputType;
    _sum?: AttemptSumAggregateInputType;
    _min?: AttemptMinAggregateInputType;
    _max?: AttemptMaxAggregateInputType;
};
export type GetAttemptAggregateType<T extends AttemptAggregateArgs> = {
    [P in keyof T & keyof AggregateAttempt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttempt[P]> : Prisma.GetScalarType<T[P], AggregateAttempt[P]>;
};
export type AttemptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithAggregationInput | Prisma.AttemptOrderByWithAggregationInput[];
    by: Prisma.AttemptScalarFieldEnum[] | Prisma.AttemptScalarFieldEnum;
    having?: Prisma.AttemptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttemptCountAggregateInputType | true;
    _avg?: AttemptAvgAggregateInputType;
    _sum?: AttemptSumAggregateInputType;
    _min?: AttemptMinAggregateInputType;
    _max?: AttemptMaxAggregateInputType;
};
export type AttemptGroupByOutputType = {
    id: number;
    score: number;
    startedAt: Date;
    finishedAt: Date | null;
    userId: number;
    quizId: number;
    _count: AttemptCountAggregateOutputType | null;
    _avg: AttemptAvgAggregateOutputType | null;
    _sum: AttemptSumAggregateOutputType | null;
    _min: AttemptMinAggregateOutputType | null;
    _max: AttemptMaxAggregateOutputType | null;
};
export type GetAttemptGroupByPayload<T extends AttemptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttemptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttemptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttemptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttemptGroupByOutputType[P]>;
}>>;
export type AttemptWhereInput = {
    AND?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    OR?: Prisma.AttemptWhereInput[];
    NOT?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    id?: Prisma.IntFilter<"Attempt"> | number;
    score?: Prisma.IntFilter<"Attempt"> | number;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    userId?: Prisma.IntFilter<"Attempt"> | number;
    quizId?: Prisma.IntFilter<"Attempt"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    quiz?: Prisma.XOR<Prisma.QuizScalarRelationFilter, Prisma.QuizWhereInput>;
};
export type AttemptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    quiz?: Prisma.QuizOrderByWithRelationInput;
};
export type AttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    OR?: Prisma.AttemptWhereInput[];
    NOT?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    score?: Prisma.IntFilter<"Attempt"> | number;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    userId?: Prisma.IntFilter<"Attempt"> | number;
    quizId?: Prisma.IntFilter<"Attempt"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    quiz?: Prisma.XOR<Prisma.QuizScalarRelationFilter, Prisma.QuizWhereInput>;
}, "id">;
export type AttemptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
    _count?: Prisma.AttemptCountOrderByAggregateInput;
    _avg?: Prisma.AttemptAvgOrderByAggregateInput;
    _max?: Prisma.AttemptMaxOrderByAggregateInput;
    _min?: Prisma.AttemptMinOrderByAggregateInput;
    _sum?: Prisma.AttemptSumOrderByAggregateInput;
};
export type AttemptScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttemptScalarWhereWithAggregatesInput | Prisma.AttemptScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttemptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttemptScalarWhereWithAggregatesInput | Prisma.AttemptScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Attempt"> | number;
    score?: Prisma.IntWithAggregatesFilter<"Attempt"> | number;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"Attempt"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Attempt"> | Date | string | null;
    userId?: Prisma.IntWithAggregatesFilter<"Attempt"> | number;
    quizId?: Prisma.IntWithAggregatesFilter<"Attempt"> | number;
};
export type AttemptCreateInput = {
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutAttemptsInput;
    quiz: Prisma.QuizCreateNestedOneWithoutAttemptsInput;
};
export type AttemptUncheckedCreateInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    userId: number;
    quizId: number;
};
export type AttemptUpdateInput = {
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutAttemptsNestedInput;
    quiz?: Prisma.QuizUpdateOneRequiredWithoutAttemptsNestedInput;
};
export type AttemptUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptCreateManyInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    userId: number;
    quizId: number;
};
export type AttemptUpdateManyMutationInput = {
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AttemptUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptListRelationFilter = {
    every?: Prisma.AttemptWhereInput;
    some?: Prisma.AttemptWhereInput;
    none?: Prisma.AttemptWhereInput;
};
export type AttemptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttemptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
};
export type AttemptAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
};
export type AttemptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
};
export type AttemptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
};
export type AttemptSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    quizId?: Prisma.SortOrder;
};
export type AttemptCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutUserInput | Prisma.AttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutUserInput | Prisma.AttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptCreateNestedManyWithoutQuizInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput> | Prisma.AttemptCreateWithoutQuizInput[] | Prisma.AttemptUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutQuizInput | Prisma.AttemptCreateOrConnectWithoutQuizInput[];
    createMany?: Prisma.AttemptCreateManyQuizInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUncheckedCreateNestedManyWithoutQuizInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput> | Prisma.AttemptCreateWithoutQuizInput[] | Prisma.AttemptUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutQuizInput | Prisma.AttemptCreateOrConnectWithoutQuizInput[];
    createMany?: Prisma.AttemptCreateManyQuizInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUpdateManyWithoutQuizNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput> | Prisma.AttemptCreateWithoutQuizInput[] | Prisma.AttemptUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutQuizInput | Prisma.AttemptCreateOrConnectWithoutQuizInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutQuizInput | Prisma.AttemptUpsertWithWhereUniqueWithoutQuizInput[];
    createMany?: Prisma.AttemptCreateManyQuizInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutQuizInput | Prisma.AttemptUpdateWithWhereUniqueWithoutQuizInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutQuizInput | Prisma.AttemptUpdateManyWithWhereWithoutQuizInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput> | Prisma.AttemptCreateWithoutQuizInput[] | Prisma.AttemptUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutQuizInput | Prisma.AttemptCreateOrConnectWithoutQuizInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutQuizInput | Prisma.AttemptUpsertWithWhereUniqueWithoutQuizInput[];
    createMany?: Prisma.AttemptCreateManyQuizInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutQuizInput | Prisma.AttemptUpdateWithWhereUniqueWithoutQuizInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutQuizInput | Prisma.AttemptUpdateManyWithWhereWithoutQuizInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type AttemptCreateWithoutUserInput = {
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    quiz: Prisma.QuizCreateNestedOneWithoutAttemptsInput;
};
export type AttemptUncheckedCreateWithoutUserInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    quizId: number;
};
export type AttemptCreateOrConnectWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput>;
};
export type AttemptCreateManyUserInputEnvelope = {
    data: Prisma.AttemptCreateManyUserInput | Prisma.AttemptCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptUpdateWithoutUserInput, Prisma.AttemptUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput>;
};
export type AttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptUpdateWithoutUserInput, Prisma.AttemptUncheckedUpdateWithoutUserInput>;
};
export type AttemptUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyWithoutUserInput>;
};
export type AttemptScalarWhereInput = {
    AND?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
    OR?: Prisma.AttemptScalarWhereInput[];
    NOT?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
    id?: Prisma.IntFilter<"Attempt"> | number;
    score?: Prisma.IntFilter<"Attempt"> | number;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    userId?: Prisma.IntFilter<"Attempt"> | number;
    quizId?: Prisma.IntFilter<"Attempt"> | number;
};
export type AttemptCreateWithoutQuizInput = {
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutAttemptsInput;
};
export type AttemptUncheckedCreateWithoutQuizInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    userId: number;
};
export type AttemptCreateOrConnectWithoutQuizInput = {
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput>;
};
export type AttemptCreateManyQuizInputEnvelope = {
    data: Prisma.AttemptCreateManyQuizInput | Prisma.AttemptCreateManyQuizInput[];
    skipDuplicates?: boolean;
};
export type AttemptUpsertWithWhereUniqueWithoutQuizInput = {
    where: Prisma.AttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptUpdateWithoutQuizInput, Prisma.AttemptUncheckedUpdateWithoutQuizInput>;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutQuizInput, Prisma.AttemptUncheckedCreateWithoutQuizInput>;
};
export type AttemptUpdateWithWhereUniqueWithoutQuizInput = {
    where: Prisma.AttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptUpdateWithoutQuizInput, Prisma.AttemptUncheckedUpdateWithoutQuizInput>;
};
export type AttemptUpdateManyWithWhereWithoutQuizInput = {
    where: Prisma.AttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyWithoutQuizInput>;
};
export type AttemptCreateManyUserInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    quizId: number;
};
export type AttemptUpdateWithoutUserInput = {
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    quiz?: Prisma.QuizUpdateOneRequiredWithoutAttemptsNestedInput;
};
export type AttemptUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptCreateManyQuizInput = {
    id?: number;
    score?: number;
    startedAt?: Date | string;
    finishedAt?: Date | string | null;
    userId: number;
};
export type AttemptUpdateWithoutQuizInput = {
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutAttemptsNestedInput;
};
export type AttemptUncheckedUpdateWithoutQuizInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptUncheckedUpdateManyWithoutQuizInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type AttemptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    score?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    userId?: boolean;
    quizId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    score?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    userId?: boolean;
    quizId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    score?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    userId?: boolean;
    quizId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectScalar = {
    id?: boolean;
    score?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    userId?: boolean;
    quizId?: boolean;
};
export type AttemptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "score" | "startedAt" | "finishedAt" | "userId" | "quizId", ExtArgs["result"]["attempt"]>;
export type AttemptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
};
export type AttemptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
};
export type AttemptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
};
export type $AttemptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Attempt";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        quiz: Prisma.$QuizPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        score: number;
        startedAt: Date;
        finishedAt: Date | null;
        userId: number;
        quizId: number;
    }, ExtArgs["result"]["attempt"]>;
    composites: {};
};
export type AttemptGetPayload<S extends boolean | null | undefined | AttemptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttemptPayload, S>;
export type AttemptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttemptCountAggregateInputType | true;
};
export interface AttemptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Attempt'];
        meta: {
            name: 'Attempt';
        };
    };
    findUnique<T extends AttemptFindUniqueArgs>(args: Prisma.SelectSubset<T, AttemptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttemptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttemptFindFirstArgs>(args?: Prisma.SelectSubset<T, AttemptFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttemptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttemptFindManyArgs>(args?: Prisma.SelectSubset<T, AttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttemptCreateArgs>(args: Prisma.SelectSubset<T, AttemptCreateArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttemptCreateManyArgs>(args?: Prisma.SelectSubset<T, AttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttemptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttemptDeleteArgs>(args: Prisma.SelectSubset<T, AttemptDeleteArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttemptUpdateArgs>(args: Prisma.SelectSubset<T, AttemptUpdateArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttemptDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttemptUpdateManyArgs>(args: Prisma.SelectSubset<T, AttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttemptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttemptUpsertArgs>(args: Prisma.SelectSubset<T, AttemptUpsertArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttemptCountArgs>(args?: Prisma.Subset<T, AttemptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttemptCountAggregateOutputType> : number>;
    aggregate<T extends AttemptAggregateArgs>(args: Prisma.Subset<T, AttemptAggregateArgs>): Prisma.PrismaPromise<GetAttemptAggregateType<T>>;
    groupBy<T extends AttemptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttemptGroupByArgs['orderBy'];
    } : {
        orderBy?: AttemptGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttemptFieldRefs;
}
export interface Prisma__AttemptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    quiz<T extends Prisma.QuizDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuizDefaultArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttemptFieldRefs {
    readonly id: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly score: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly startedAt: Prisma.FieldRef<"Attempt", 'DateTime'>;
    readonly finishedAt: Prisma.FieldRef<"Attempt", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly quizId: Prisma.FieldRef<"Attempt", 'Int'>;
}
export type AttemptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptCreateInput, Prisma.AttemptUncheckedCreateInput>;
};
export type AttemptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttemptCreateManyInput | Prisma.AttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttemptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    data: Prisma.AttemptCreateManyInput | Prisma.AttemptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttemptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttemptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptUpdateInput, Prisma.AttemptUncheckedUpdateInput>;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyInput>;
    where?: Prisma.AttemptWhereInput;
    limit?: number;
};
export type AttemptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyInput>;
    where?: Prisma.AttemptWhereInput;
    limit?: number;
    include?: Prisma.AttemptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttemptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateInput, Prisma.AttemptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttemptUpdateInput, Prisma.AttemptUncheckedUpdateInput>;
};
export type AttemptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    limit?: number;
};
export type AttemptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
};
